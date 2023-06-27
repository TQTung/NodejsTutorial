import { validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

// const myEvent = new EventEmitter();
// myEvent.on("event.register.user", (params) => {
//   console.log(`They talk about : ${JSON.stringify(params)}`);
// });

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  await userRepository.login({ email: email, password: password });
  res.status(HttpStatusCode.OK).json({
    message: "Login user successfully",
  });
};

const register = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  // myEvent.emit("event.register.user", { email, phoneNumber });

  try {
    debugger;
    await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      address,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      mes: "Registered user successfully",
      // data: user,
    });
  } catch (exception) {
    debugger;
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getDetailUser = async (req, res) => {};
const getAllUser = async (req, res) => {};

export default {
  login,
  register,
  getDetailUser,
  getAllUser,
};
