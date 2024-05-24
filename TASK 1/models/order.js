module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      total: { type: DataTypes.FLOAT, allowNull: false }
    });
    return Order;
  };
  