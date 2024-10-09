import { Server } from "http";
import app from "./app";
import logger from "./utils/logger";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

const server: Server = app.listen(port, () => {
  logger.info(`Listening to port ${port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
