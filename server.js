import express from "express";
import * as dotenv from "dotenv";
import { userRouter, studentRouter } from "./routes/index.js";
import connect from "./database/database.js";
import checkToken from "./middleware/authentication/auth.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API for mongodb",
      version: "1.0.0",
    },
    servers: [
      {
        api: "http://localhost:3030",
      },
    ],
  },
  apis: ["./server.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(checkToken);
app.use(express.json());

app.use("/users", userRouter);
app.use("/students", studentRouter);

app.listen(port, async () => {
  await connect();
  console.log(`Listening on port : ${port}`);
});
