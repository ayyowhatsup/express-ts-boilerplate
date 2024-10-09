import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import _ from "lodash";
import ValidationSchema from "../types/validation-schema.type";
import ApiError from "../utils/api-error";
import { StatusCodes } from "http-status-codes";

export default function validateSchema(schema: ValidationSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const validateSchema = _.pick(schema, ["body", "params", "query"]);
    const object = _.pick(req, Object.keys(validateSchema));
    const { value, error } = Joi.compile(validateSchema).validate(object, options);

    if (error) {
      throw new ApiError({
        status: StatusCodes.BAD_REQUEST,
        code: "BAD_REQUEST",
        message: error.message,
      });
    }

    Object.assign(req, value);
    next();
  };
}
