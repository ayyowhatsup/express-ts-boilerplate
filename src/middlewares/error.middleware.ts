import ApiError from "../utils/api-error";
import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger";

export const responseHandler = (err: any, req: any, res: any, next: any) => {
  let error = err;
  if (error instanceof Error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        code: "internal_server_error",
        message: err.message,
      });
    }
    return next(error);
  }

  const { status, code, message, data } = error;

  const resp = {
    code: code || "success",
    message: message || "Request was successful",
    data: data,
  };

  logger.info({
    ip: req.ip,
    method: req.method,
    url: req.url,
    query: req.query,
    params: req.params,
    body: req.body,
    user: (req as any).user,
    response: resp,
  });

  return res.status(status || StatusCodes.OK).send(resp);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: any, req: any, res: any, next: any) => {
  const resp = {
    code: err.code,
    message: err.message,
  };

  logger.error({
    ip: req.ip,
    method: req.method,
    url: req.url,
    query: req.query,
    params: req.params,
    body: req.body,
    user: (req as any).user,
    response: resp,
  });

  return res.status(err.status || 500).send(resp);
};
