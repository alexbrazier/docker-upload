import Joi from 'joi';

export default {
  add: {
    body: {
      name: Joi.string().required(),
      tag: Joi.string().required(),
      image: Joi.string().required()
    }
  }
};
