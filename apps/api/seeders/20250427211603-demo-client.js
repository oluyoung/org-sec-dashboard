'use strict';
const { faker } = require('@faker-js/faker');

const CLIENT_ID = "0943a96c-06cb-4f4e-a1b9-10e8b7e4f92c";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const clients = [...Array(3)].map(() => ({
      clientId: faker.string.uuid(),
      organisationName: faker.company.name(),
      contactEmail: faker.internet.email(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    clients[0].clientId = CLIENT_ID;

    await queryInterface.bulkInsert('Clients', clients);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};
