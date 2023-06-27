import chalk from "chalk";

class OuputType {
  static INFORMATION = "INFORMATION";
  static SUCCESS = "SUCCESS";
  static WARNING = "WARNING";
  static ERROR = "ERROR";
}
const print = (message, outputType) => {
  switch (outputType) {
    case OuputType.INFORMATION:
      console.log(chalk.white(message));
      break;
    case OuputType.SUCCESS:
      console.log(chalk.green(message));
      break;
    case OuputType.WARNING:
      console.log(chalk.yellow(message));
      break;
    case OuputType.ERROR:
      console.log(chalk.red(message));
      break;
    default:
      console.log(chalk.white(message));
  }
};

export { print, OuputType };
