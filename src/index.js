
import React from 'react';
import ReactDOM from 'react-dom';

// todo(pinussilvestrus): make modules available via npm or something else
// https://medium.com/@arnaudrinquin/build-modular-application-with-npm-local-modules-dfc5ff047bcc
import {
  AppParent,
  KeyboardBindings,
  TabsProvider
} from '/Users/niklas.kiefer/Github/camunda-modeler/client/src/app';

import {
  backend,
  dialog,
  fileSystem,
  workspace
} from '/Users/niklas.kiefer/Github/camunda-modeler/client/src/remote';

import {
  getProvidersList
} from './tabs';

const isMac = backend.getPlatform() === 'darwin';

const keyboardBindings = new KeyboardBindings({
  isMac
});

const tabsProvider = new TabsProvider({
  providers: getProvidersList()
});

const globals = {
  backend,
  dialog,
  fileSystem,
  workspace
};

const rootElement = document.getElementById('root');
ReactDOM.render(
  <AppParent
    keyboardBindings={ keyboardBindings }
    globals={ globals }
    tabsProvider={ tabsProvider }
  />, rootElement
);
