const Sequelize = require("sequelize");
const {sequelizeAct} = require("../../connection");

const ActBodyModel = sequelizeAct.define(
  "actbodies",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    materialId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    codeByOKEI: {
      type: Sequelize.INTEGER,
    },
    unit: {
      type: Sequelize.STRING(8),
      allowNull: false,
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reason: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    headerId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ActBodyModel;
