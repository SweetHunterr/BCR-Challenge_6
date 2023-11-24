'use strict';
const bcrypt = require("bcryptjs")

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const password = "superadmin"
    const salt = process.env.SALT_KEY
    const hashPassword = await bcrypt.hash(password + salt, 12)

    await queryInterface.bulkInsert('tbl_users', [{
      role: "superadmin",
      email: "superadmin@icloud.com",
      password: hashPassword,
      name: "Okuli Siahaan",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
