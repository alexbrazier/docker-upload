'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
var envVarsSchema = _joi2.default.object({
  NODE_ENV: _joi2.default.string().allow(['development', 'production', 'test', 'provision']).default('development'),
  PORT: _joi2.default.number().default(3000),
  REGISTRY: _joi2.default.string().required().description('REGISTRY env required to push images'),
  INSECURE_REGISTRY: _joi2.default.boolean().default(false)
}).unknown().required();

var _Joi$validate = _joi2.default.validate(process.env, envVarsSchema),
    error = _Joi$validate.error,
    envVars = _Joi$validate.value;

if (error) {
  throw new Error('Config validation error: ' + error.message);
}

var config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  registry: envVars.REGISTRY,
  insecureRegistry: envVars.INSECURE_REGISTRY
};

// Allow with or without trailng slash
if (config.registry.endsWith('/')) {
  config.registry = config.registry.slice(0, -1);
}

exports.default = config;
module.exports = exports['default'];
//# sourceMappingURL=config.js.map
