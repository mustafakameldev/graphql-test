const db = require('../db');
const Query = {
  greeting: () => {
    return 'hello from  TutorialsPoint !!!';
  },
  students: () => db.students.list(),
  studentById: (root, args, context, info) => {
    console.log({ root, args, context, info });
    return db.students.get(args.id);
  },
};

const Student = {
  // here the manipulated data
  // user has no full name
  // so we will create a full name
  // and add this to the user
  fullName: (root, args, context, info) => {
    return root.firstName + ' ' + root.lastName;
  },
};

module.exports = { Query, Student };
