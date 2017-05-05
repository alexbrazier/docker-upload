'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dockerode = require('dockerode');

var _dockerode2 = _interopRequireDefault(_dockerode);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var docker = new _dockerode2.default();

function add(req, res, next) {
  var _req$body = req.body,
      name = _req$body.name,
      tag = _req$body.tag;

  var repo = _config2.default.registry + '/' + name;
  var imageOpts = { repo: repo, tag: tag };
  var image = repo + ':' + tag;
  docker.importImage(req.files.image.data, imageOpts).then(function () {
    return docker.getImage(image).push({});
  }).then(function (stream) {
    return waitUntilFinish(stream);
  }).then(function () {
    return docker.getImage(image).remove({});
  }).then(function (stream) {
    return waitUntilFinish(stream);
  }).then(function () {
    return res.send();
  }).catch(next);
}

function waitUntilFinish(stream) {
  return new _bluebird2.default(function (resolve, reject) {
    return docker.modem.followProgress(stream, function (err, result) {
      return err && reject(err) || resolve(result);
    }, function () {});
  });
}

exports.default = { add: add };
module.exports = exports['default'];
//# sourceMappingURL=upload.js.map
