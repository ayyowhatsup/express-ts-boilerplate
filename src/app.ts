import express from "express";
import route from "./routes";
import ApiError from "./utils/api-error";
import compression from "compression";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import helmet from "helmet";
import xss from "xss-clean";

import { errorHandler, responseHandler } from "./middlewares/error.middleware";

const app: express.Express = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use(xss());

app.use(cors());

app.use("/api/v1", route);

app.use((req, res, next) => {
  next(
    new ApiError({
      status: StatusCodes.NOT_FOUND,
      code: "not_found",
      message: "Request not found",
    })
  );
});

app.use(responseHandler);

// handle error
app.use(errorHandler);

export default app;
