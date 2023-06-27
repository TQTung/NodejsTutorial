import Exception from "../exceptions/Exception.js";
import { UserModel } from "../models/index.js";
import bcrypt from "bcrypt";

const login = async ({ email, password }) => {};
const register = async ({ email, password, phoneNumber, address, name }) => {
  try {
    // console.log({ email, password, phoneNumber, address, name });
    // debugger;
    // let existingUser = await UserModel.findOne({ email }).exce();
    // if (!!existingUser) {
    //   throw new Exception(Exception.USER_EXIST);
    // }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    // const newUser = new UserModel({
    //   name,
    //   email,
    //   password: hashedPassword,
    //   phoneNumber,
    //   address,
    // });

    // const a = await newUser.save();

    console.log(hashedPassword);
  } catch (exception) {
    // debugger;
    throw new Exception(Exception.CANNOT_REGISTER_USER);
  }
};

export default {
  login,
  register,
};
