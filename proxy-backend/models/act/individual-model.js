const Sequelize = require("sequelize");
const { sequelizeAct } = require("../../connection");

const IndividualModel = sequelizeAct.define(
  "individuals",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(25),
      allowNull: false,
    },
    surname: {
      type: Sequelize.STRING(25),
      allowNull: false,
    },
    patronymic: {
      type: Sequelize.STRING(25),
      default: null,
    },
    job: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    series: {
      type: Sequelize.STRING(4),
      allowNull: false,
    },
    number: {
      type: Sequelize.STRING(6),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = IndividualModel;
