const { DataStore } = require('notarealdb');

const store = new DataStore('./data/students');

module.exports = {
  students: store.collection('students'),
  colleges: store.collection('colleges'),
};
