// make sure '1031-zeebe-modeler-core-experiments' is the current branch!
const execa = require('execa');

// todo(pinussilvestrus): update package.json
const BACKEND_MODULE_PATH = '/Users/niklas.kiefer/GitHub/camunda-modeler/app';

const startBackend = async () => {
    // todo(pinussilvestrus): use electron directly ?

    const {
        stdout,
        stderr
    } = execa.shell(`APP_NAME='Zeebe Modeler' electron ${BACKEND_MODULE_PATH}/dev.js`);

    // todo(pinussilvestrus): label output to make clear from which instance it was
    // generated
    stdout.pipe(process.stdout);
    stderr.pipe(process.stderr);
}

// 1) start electron app, configure name etc.
try {
    startBackend();
    console.log('##### Started backend #####');
} catch(e) {
    console.log(e);
}

// 2) start react app, configure tabs etc.
