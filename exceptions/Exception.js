import { print, OuputType } from "../helpers/print.js";

export default class Exception extends Error {
  constructor(message) {
    super(message);
    print(message, OuputType.ERROR);
  }

  static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username or password";
  static WRONG_CONECTION_STRING = "Wrong server name/connection string";
  static CANNOT_CONNECT_MONGODB = "Cannot connect to MongoDB";

  static EMAIL_EXIST = "Email'user already exists";
  static CANNOT_REGISTER_USER = "Cannot register user";

  static WRONG_EMAIL_OR_PASSWORD = "Wrong email or password";
}
