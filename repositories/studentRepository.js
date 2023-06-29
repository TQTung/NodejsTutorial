import Exception from "../exceptions/Exception.js";
import { StudentModel } from "../models/index.js";
import { faker } from "@faker-js/faker";

const getAllStudents = async ({ page, size, searchString }) => {
  // aggregate data for all students
  const pageParse = parseInt(page);
  const sizeParse = parseInt(size);

  const filteredStudent = await StudentModel.aggregate([
    {
      $match: {
        $or: [
          {
            name: { $regex: `.*${searchString}.*`, $options: "i" }, // ignore case
          },
          {
            email: { $regex: `.*${searchString}.*`, $options: "i" }, // ignore case
          },
          {
            address: { $regex: `.*${searchString}.*`, $options: "i" }, // ignore case
          },
        ],
      },
    },
    {
      $skip: (pageParse - 1) * sizeParse,
    },
    {
      $limit: sizeParse,
    },
  ]);

  return filteredStudent;
};

const getDetailStudent = async (studentId) => {
  const student = await StudentModel.findById(studentId);
  if (!student) {
    throw new Exception("Cannot find student with id " + studentId);
  }
  return student;
};

const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  try {
    const student = await StudentModel.create({
      name,
      email,
      languages,
      gender,
      phoneNumber,
      address,
    });
    return student;
  } catch (exception) {
    throw new Exception(exception);
  }
};
const updateStudent = async ({
  id,
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  const student = await StudentModel.findById(id);
  student.name = name ?? student.name;
  student.email = email ?? student.email;
  student.languages = languages ?? student.languages;
  student.gender = gender ?? student.gender;
  student.phoneNumber = phoneNumber ?? student.phoneNumber;
  student.address = address ?? student.address;

  await student.save();
  return student;
};

async function generateFakerStudents() {
  let fakeStudents = [];
  for (let i = 0; i < 100; i++) {
    let fakeStudent = {
      name: `${faker.person.fullName()}-fake`,
      email: faker.internet.email(),
      languages: [
        faker.helpers.arrayElement([, "Vietnamese", "Japanese"]),
        faker.helpers.arrayElement(["English", "Korean"]),
      ],
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      phoneNumber: faker.phone.number(),
      address: faker.location.streetAddress(),
    };
    fakeStudents.push(fakeStudent);
  }
  await StudentModel.insertMany(fakeStudents);
}

export default {
  getAllStudents,
  insertStudent,
  generateFakerStudents,
  getDetailStudent,
  updateStudent,
};
