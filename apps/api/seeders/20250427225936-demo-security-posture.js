'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const posturesLength = await queryInterface.sequelize.query(
      `SELECT count(*) FROM SecurityPostures;`
    )

    if (posturesLength) return;

    const [clients] = await queryInterface.sequelize.query(
      `SELECT clientId FROM Clients LIMIT 1;`
    );

    if (clients.length === 0) {
      throw new Error('No clients found. Seed Clients table first.');
    }

    const clientId = clients[0].clientId;

    const postures = [...Array(1)].map(() => ({
      clientId: clientId,
      lastScanDate: faker.date.recent(30),
      threatsDetected: faker.number.int({ min: 0, max: 10 }),
      riskScore: faker.number.int({ min: 0, max: 100 }),
      vulnerabilitiesFound: faker.number.int({ min: 0, max: 20 }),
      incidentsReported: faker.number.int({ min: 0, max: 10 }),
      reportDate: faker.date.recent(30),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('SecurityPostures', postures, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SecurityPostures', null, {});
  }
};
