const Sequelize = require("sequelize");
const {sequelizeProxy} = require("../../connection");

const ProxyBodyModel = sequelizeProxy.define(
  "proxybodies",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    count: {
      type: Sequelize.INTEGER,
      default: 1,
    },
    unit: {
      type: Sequelize.STRING(8),
      allowNull: false,
    },
    proxyHeaderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ProxyBodyModel;
