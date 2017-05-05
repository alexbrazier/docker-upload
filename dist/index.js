'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_express2.default.listen(_config2.default.port, function () {
  console.info('server started on port ' + _config2.default.port + ' (' + _config2.default.env + ')'); // eslint-disable-line no-console
});

exports.default = _express2.default;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
