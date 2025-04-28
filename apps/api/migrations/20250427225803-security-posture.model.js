'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SecurityPostures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      clientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Clients',
          key: 'clientId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      lastScanDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      threatsDetected: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      riskScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      vulnerabilitiesFound: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      incidentsReported: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reportDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SecurityPostures');
  }
};
