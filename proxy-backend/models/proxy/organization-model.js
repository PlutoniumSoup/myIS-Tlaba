const Sequelize = require("sequelize");
const {sequelizeProxy} = require("../../connection");

const OrganizationModel = sequelizeProxy.define(
  "organizations",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    inn: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = OrganizationModel;
