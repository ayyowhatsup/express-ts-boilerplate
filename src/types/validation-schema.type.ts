import Joi from "joi";

type ValidationSchema = {
  params?: Joi.ObjectSchema<any>;
  query?: Joi.ObjectSchema<any>;
  body?: Joi.ObjectSchema<any>;
};

export default ValidationSchema;
