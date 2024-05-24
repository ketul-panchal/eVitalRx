const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// change infromation in .env file
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});  

const User = require('./user')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const OrderItem = require('./orderItem')(sequelize, DataTypes);
const Cart = require('./cart')(sequelize, DataTypes);

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

Cart.belongsTo(User);
Cart.belongsTo(Product);

module.exports = { sequelize, User, Product, Order, OrderItem, Cart };
