import HashPassword from "../../src/repositories/account-repository";
("use strict");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "mausam@gmail.com",
          password: await HashPassword.createHashPassword("Mausam@123"),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user", null, {});
  },
};
