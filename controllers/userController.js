import { validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const existingUser = await userRepository.login({
      email: email,
      password: password,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Login user successfully",
      data: existingUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const register = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  try {
    const user = await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      address,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      mes: "Registered user successfully",
      data: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
    });
  } catch (exception) {
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
