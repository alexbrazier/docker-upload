'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _upload = require('../validation/upload');

var _upload2 = _interopRequireDefault(_upload);

var _upload3 = require('../controllers/upload');

var _upload4 = _interopRequireDefault(_upload3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/').post((0, _expressValidation2.default)(_upload2.default), _upload4.default.add);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=upload.js.map
