module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      phone_no: { type: DataTypes.INTEGER, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false }
    });
    return User;
  };
  