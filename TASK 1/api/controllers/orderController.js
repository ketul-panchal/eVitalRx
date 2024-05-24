const { Order, OrderItem, Product } = require('../../models');
const jwt = require('jsonwebtoken');

// place order controller
exports.placeOrder = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  const { items } = req.body; 

  try {
    const order = await Order.create({ userId, total: 0 });

    let total = 0;
    for (const item of items) {
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

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get Order Controller
exports.getOrders = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [{ model: Product, through: { attributes: ['quantity', 'price'] } }]
    });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
