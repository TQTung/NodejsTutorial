import express from "express";
import { studentController } from "../controllers/index.js";

const studentRouter = express.Router();

studentRouter.get("/", studentController.getAllStudents);
studentRouter.get("/:id", studentController.getStudentById);
studentRouter.post("/insert", studentController.insertsStudent);
studentRouter.patch("/update", studentController.updateStudent);

export default studentRouter;
