import Exception from "../exceptions/Exception.js";
import { UserModel } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async ({ email, password }) => {
  const existingUser = await UserModel.findOne({ email }).exec();
  if (existingUser) {
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      // create a JWT
      const token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "10 days",
        }
      );
      // clone an add more pro
      return {
        ...existingUser.toObject(),
        password: "Not show",
        token: token,
      };
    } else {
      throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
  }
};
const register = async ({ email, password, phoneNumber, address, name }) => {
  let existingUser = await UserModel.findOne({ email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.EMAIL_EXIST);
  }

  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const newUser = UserModel.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
  });
  return newUser;
};

export default {
  login,
  register,
};
