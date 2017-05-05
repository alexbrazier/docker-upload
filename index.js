import config from './config/config';
import app from './config/express';

app.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
});

export default app;
