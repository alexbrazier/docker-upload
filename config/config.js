import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(3000),
  REGISTRY: Joi.string().required()
    .description('REGISTRY env required to push images'),
  INSECURE_REGISTRY: Joi.boolean()
    .default(false)
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  registry: envVars.REGISTRY,
  insecureRegistry: envVars.INSECURE_REGISTRY
};

// Allow with or without trailng slash
if (config.registry.endsWith('/')) {
  config.registry = config.registry.slice(0, -1);
}

export default config;
