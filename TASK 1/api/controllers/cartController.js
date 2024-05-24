const { Cart, Product, Order, OrderItem } = require('../../models');
const jwt = require('jsonwebtoken');

// Add to cart controller
exports.addToCart = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  const { productId, quantity } = req.body;

  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let cartItem = await Cart.findOne({ where: { userId, productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// check out controller
exports.checkout = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  try {
    const cartItems = await Cart.findAll({ where: { userId } });

    if (cartItems.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    const order = await Order.create({ userId, total: 0 });

    let total = 0;
    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        const orderItem = await OrderItem.create({
          orderId: order.id,
          productId: product.id,
          quantity: item.quantity,
          price: product.price * item.quantity
        });
        total += orderItem.price;
      }
    }

    order.total = total;
    await order.save();

    await Cart.destroy({ where: { userId } });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
