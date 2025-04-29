'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const incidentsLength = await queryInterface.sequelize.query(
      `SELECT count(*) FROM Incidents;`
    )

    if (incidentsLength) return;

    const [clients] = await queryInterface.sequelize.query(
      `SELECT clientId FROM Clients LIMIT 1;`
    );

    if (clients.length === 0) {
      throw new Error('No clients found. Seed Clients table first.');
    }

    const clientId = clients[0].clientId;

    const incidents = Array.from({ length: 100 }, () => ({
      clientId: clientId,
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement(['closed', 'open', 'progress']),
      severity: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']),
      reportedAt: faker.date.past(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Incidents', incidents, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Incidents', null, {});
  }
};
