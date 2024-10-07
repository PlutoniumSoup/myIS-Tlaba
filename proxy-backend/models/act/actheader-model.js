const Sequelize = require('sequelize');
const {sequelizeAct} = require('../../connection');

const ActHeaderModel = sequelizeAct.define(
    "actheaders",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      individualId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      companyId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      basis: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      dischargeDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

module.exports = ActHeaderModel;