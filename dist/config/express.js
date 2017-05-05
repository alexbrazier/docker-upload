'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _expressValidation = require('express-validation');

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _expressFileupload = require('express-fileupload');

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _index = require('../server/routes/index');

var _index2 = _interopRequireDefault(_index);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _APIError = require('../server/helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

if (_config2.default.env === 'development') {
  app.use((0, _morgan2.default)('dev'));
}

app.use(_express2.default.static('public'));

app.use((0, _expressFileupload2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _helmet2.default)());
app.use((0, _cors2.default)());

app.use('/api', _index2.default);

// if error is not an instanceOf APIError, convert it.
app.use(function (err, req, res, next) {
  if (err instanceof _expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    var unifiedErrorMessage = err.errors.map(function (error) {
      return error.messages.join('. ');
    }).join(' and ');
    var error = new _APIError2.default(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof _APIError2.default)) {
    var apiError = new _APIError2.default(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new _APIError2.default('API not found', _httpStatus2.default.NOT_FOUND);
  return next(err);
});

// error handler, send stacktrace only during development
app.use(function (err, req, res, next) {
  return (// eslint-disable-line no-unused-vars
    res.status(err.status).json({
      message: err.isPublic ? err.message : _httpStatus2.default[err.status],
      stack: _config2.default.env === 'development' ? err.stack : {}
    })
  );
});

exports.default = app;
module.exports = exports['default'];
//# sourceMappingURL=express.js.map
