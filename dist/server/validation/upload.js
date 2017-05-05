'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  add: {
    body: {
      name: _joi2.default.string().required(),
      tag: _joi2.default.string().required(),
      image: _joi2.default.string().required()
    }
  }
};
module.exports = exports['default'];
//# sourceMappingURL=upload.js.map
