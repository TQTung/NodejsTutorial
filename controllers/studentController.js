import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { MAX_RECORD_SIZE } from "../Global/constants.js";
import { studentRepository } from "../repositories/index.js";

const getAllStudents = async (req, res) => {
  let { page = 1, size = MAX_RECORD_SIZE, searchString = "" } = req.query;
  size = size >= MAX_RECORD_SIZE ? MAX_RECORD_SIZE : size;

  try {
    const filteredStudent = await studentRepository.getAllStudents({
      size,
      page,
      searchString,
    });

    res.status(HttpStatusCode.OK).json({
      message: "Get all students successfully",
      size: filteredStudent.length,
      page,
      searchString,
      data: filteredStudent,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message.toString(),
    });
  }
};

const getDetailStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await studentRepository.getDetailStudent(studentId);
    res.status(HttpStatusCode.OK).json({
      message: "Get detail student successfully",
      data: student,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message.toString(),
    });
  }
};
const updateStudent = async (req, res) => {
  try {
    const student = await studentRepository.updateStudent(req.body);
    res.status(HttpStatusCode.OK).json({
      message: "Update student successfully",
      data: student,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message.toString(),
    });
  }
};
const insertsStudent = async (req, res) => {
  try {
    const student = await studentRepository.insertStudent(req.body);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Insert student successfully",
      data: student,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message.toString(),
    });
  }
};

const generateFakerStudents = async (req, res) => {
  await studentRepository.generateFakerStudents(req.body);
  res.status(HttpStatusCode.INSERT_OK).json({
    message: "Insert fake students successfully",
  });
};

export default {
  getAllStudents,
  getDetailStudent,
  updateStudent,
  insertsStudent,
  generateFakerStudents,
};
