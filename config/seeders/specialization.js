"use strict";

const table = "specializations";
const listArray = [
  { specialization: "Cardiology" },
  { specialization: "Dermatology" },
  { specialization: "Endocrinology" },
  { specialization: "Gastroenterology" },
  { specialization: "Neurology" },
  { specialization: "Ophthalmology" },
  { specialization: "Orthopedics" },
  { specialization: "Pediatrics" },
];
const data = listArray.map((element) => ({
  specialization: element.specialization,
}));

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(table, data, {}),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete(table, null, {}),
};
