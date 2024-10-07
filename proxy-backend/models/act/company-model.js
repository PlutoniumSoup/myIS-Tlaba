const Sequelize = require("sequelize");
const {sequelizeAct} = require("../../connection");

const CompanyModel = sequelizeAct.define(
  "companies",
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

module.exports = CompanyModel;
