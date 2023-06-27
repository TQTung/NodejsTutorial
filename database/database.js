import mongoose from "mongoose";
import { print, OuputType } from "../helpers/print.js";
import Exception from "../exceptions/Exception.js";

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    let connection = mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    print("Connect mongoose successfully", OuputType.SUCCESS);
    return connection;
  } catch (error) {
    if (error.code === 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (error.code === "ENOTFOUND") {
      throw new Exception(Exception.WRONG_CONECTION_STRING);
    }
    throw new Exception(Exception.CANNOT_CONNECT_MONGODB);
  }
};

export default connect;
