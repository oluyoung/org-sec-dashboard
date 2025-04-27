'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const clients = [...Array(3)].map(() => ({
      clientId: faker.string.uuid(),
      organisationName: faker.company.name(),
      contactEmail: faker.internet.email(),
    }));

    await queryInterface.bulkInsert('Clients', clients);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};
