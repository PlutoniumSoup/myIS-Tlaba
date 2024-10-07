const Sequelize = require("sequelize");
const {sequelizeAct} = require("../../connection");

const MaterialModel = sequelizeAct.define(
  "materials",
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
    cost: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = MaterialModel;
