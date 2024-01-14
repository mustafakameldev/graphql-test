const db = require('./db');
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
    const { collegeId } = args;
    if (!db.colleges.get(collegeId)) throw new Error('College does not exist');
    const id = db.students.create({
      collegeId: !args.collegeId,
      firstName: !args.firstName,
      lastName: !args.lastName,
    });

    return db.students.get(id);
  },
  signUp: (root, args, context, info) => {
    // testing validation
    const { email, firstName, password } = args.input;

    const emailExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValidEmail = emailExpression.test(String(email).toLowerCase());
    if (!isValidEmail) throw new Error('email not in proper format');

    if (firstName.length > 15)
      throw new Error('firstName should be less than 15 characters');

    if (password.length < 8)
      throw new Error('password should be minimum 8 characters');

    return 'success';
  },
  deleteStudent: (root, args, context, info) => {
    return db.students.delete(args.id);
  },
  updateStudent: (root, args, context, info) => {
    db.students.update({
      id: args.id,
      collegeId: args.collegeId ?? '',
      firstName: args.firstName ?? '',
      lastName: args.lastName ?? '',
    });
    return db.students.get(args.id);
  },
  addCollege: (root, args, context, info) => {
    const id = db.colleges.create({
      name: args.name ?? '',
      location: args.location ?? '',
    });
    return db.colleges.get(id);
  },
};

module.exports = { Query, Student, Mutation };
