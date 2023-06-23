"use strict";

const table = "roles";
const listArray = [
  { role: "admin" },
  { role: "doctor" },
  { role: "patient" },
  { role: "user" },
  { role: "clinic" },
];
const data = listArray.map((element, index) => ({
  role: element.role,
  createdAt: new Date(),
          updatedAt: new Date(),
}));

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(table, data, {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete(table, null, {}),
};
