import Joi from "joi";

// registration validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(6).required(),
    address: Joi.string().min(6).required(),
    answer: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// forget password validation

const forgetPasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    answer: Joi.string().min(3).required(),
    newPassword: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

//category validation
const categoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    // slug: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};

const productValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    // slug: Joi.string().min(3).required(),
    price: Joi.number().min(3).required(),
    description: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    quantity: Joi.number().min(3).required(),
    // shipping: Joi.boolean().required(),
  });
  return schema.validate(data);
};

export {
  registerValidation,
  loginValidation,
  forgetPasswordValidation,
  categoryValidation,
  productValidation,
};
