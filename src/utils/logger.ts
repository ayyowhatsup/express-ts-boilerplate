import winston from "winston";
import dayjs from "dayjs";

const newFormat = winston.format.printf(
  ({ level, message, timestamp }) => `${level} ${timestamp} ${JSON.stringify(message)}`
);

const timestampTZ = winston.format((info) => ({
  ...info,
  timestamp: dayjs().format("DD/MM/YYYY-HH:mm:ss"),
}));

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.colorize(), timestampTZ(), newFormat),
  transports: [new winston.transports.Console()],
});

export default logger;
