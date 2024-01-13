const { DataStore } = require('notarealdb');

const store = new DataStore('./data/students');
const collegesStore = new DataStore('./data/colleges');
module.exports = {
  students: store.collection('students'),
  colleges: collegesStore.collection('colleges'),
};
