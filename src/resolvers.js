const db = require('../db');
const Query = {
  greeting: () => {
    return 'hello from  TutorialsPoint !!!';
  },
  students: () => db.students.list(),
  studentById: (root, args, context, info) => {
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
  college: (root) => {
    console.log({ root });
    return db.colleges.get(root.collegeId);
  },
};
const Mutation = {
  createStudent: (root, args, context, info) => {
    return db.students.create({
      collegeId: args.collegeId ?? '',
      firstName: args.firstName ?? '',
      lastName: args.lastName ?? '',
    });
  },
  addStudent: (root, args, context, info) => {
    const id = db.students.create({
      collegeId: args.collegeId,
      firstName: args.firstName,
      lastName: args.lastName,
    });

    return db.students.get(id);
  },
};

module.exports = { Query, Student, Mutation };
