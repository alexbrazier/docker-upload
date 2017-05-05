import Docker from 'dockerode';
import Promise from 'bluebird';
import config from '../../config/config';

const docker = new Docker();

function add(req, res, next) {
  const { name, tag } = req.body;
  const repo = `${config.registry}/${name}`;
  const imageOpts = { repo, tag };
  const image = `${repo}:${tag}`;
  docker.importImage(req.files.image.data, imageOpts)
    .then(() => docker.getImage(image).push({}))
    .then(stream => waitUntilFinish(stream))
    .then(() => docker.getImage(image).remove({}))
    .then(stream => waitUntilFinish(stream))
    .then(() => res.send())
    .catch(next);
}

function waitUntilFinish(stream) {
  return new Promise((resolve, reject) =>
    docker.modem.followProgress(
      stream,
      (err, result) => (err && reject(err)) || resolve(result),
      () => {}
    )
  );
}

export default { add };
