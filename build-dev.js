// make sure '1031-zeebe-modeler-core-experiments' is the current branch!

// todo(pinussilvestrus): move commands to package.json with parameterization
// todo(pinussilvestrus): use configuration file instead of env vars

const execa = require('execa');

// todo(pinussilvestrus): how to properly handle as external module?
const BACKEND_MODULE_PATH = '/Users/niklas.kiefer/Github/camunda-modeler/app';
const CLIENT_MODULE_PATH = '/Users/niklas.kiefer/Github/camunda-modeler/client';

const startClient = async () => {
  // todo(pinussilvestrus): use webpack directly ?

  const {
    stdout,
    stderr
  } = execa.shell(
    `cross-env NODE_ENV=development CLIENT_PATH=${CLIENT_MODULE_PATH} ` +
        'webpack-dev-server --config ./webpack.config.js --port 3000');

  stdout.pipe(process.stdout);
  stderr.pipe(process.stderr);
};

const startBackend = async () => {
  // todo(pinussilvestrus): use electron directly ?

  const {
    stdout,
    stderr
  } = execa.shell(`cross-env APP_NAME='Zeebe Modeler' electron ${BACKEND_MODULE_PATH}/dev.js`);

  // todo(pinussilvestrus): label output to make clear from which instance it was
  // generated
  stdout.pipe(process.stdout);
  stderr.pipe(process.stderr);
};

try {
  startBackend();
  console.log('##### Started Backend #####');

  startClient();
  console.log('##### Started Client #####');
} catch (e) {
  console.log(e);
}
