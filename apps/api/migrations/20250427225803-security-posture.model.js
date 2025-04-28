'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SecurityPostures', {
      postureId: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('(UUID())'),
      },
      clientId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'Clients',
          key: 'clientId'
        }
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
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SecurityPostures');
  }
};
