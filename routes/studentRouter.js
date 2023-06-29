import express from "express";
import { studentController } from "../controllers/index.js";

const studentRouter = express.Router();

studentRouter.get("/", studentController.getAllStudents);
studentRouter.get("/:id", studentController.getDetailStudent);
studentRouter.post("/insert", studentController.insertsStudent);
studentRouter.put("/update", studentController.updateStudent);

// studentRouter.post(
//   "/generateFakerStudents",
//   studentController.generateFakerStudents
// );

export default studentRouter;
