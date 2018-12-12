import zeebeDiagram from './zeebe/diagram.bpmn';

const ENCODING_BASE64 = 'base64',
      ENCODING_UTF8 = 'utf8';

const EXPORT_JPG = {
  name: 'JPG',
  encoding: ENCODING_BASE64,
  extensions: [ '.jpg' ]
};

const EXPORT_PNG = {
  name: 'PNG',
  encoding: ENCODING_BASE64,
  extensions: [ '.png' ]
};

const EXPORT_SVG = {
  name: 'SVG',
  encoding: ENCODING_UTF8,
  extensions: [ '.svg' ]
};

export default function getProvidersList() {
  return {
    empty: {
      getComponent() {
        return import('./EmptyTab');
      }
    },
    bpmn: {
      name: 'BPMN',
      encoding: ENCODING_UTF8,
      exports: {
        jpg: EXPORT_JPG,
        png: EXPORT_PNG,
        svg: EXPORT_SVG
      },
      extensions: [ 'bpmn', 'xml' ],
      getComponent(options) {
        return import('./zeebe');
      },
      getInitialContents(options) {
        return zeebeDiagram;
      },
      getHelpMenu() {
        return [{
          label: 'Zeebe Modeling Tutorial',
          action: 'https://docs.zeebe.io/bpmn-modeler/introduction.html'
        }];
      },
      getNewFileMenu() {
        return [{
          label: 'BPMN Diagram',
          accelerator: 'CommandOrControl+T',
          action: 'create-bpmn-diagram'
        }];
      }
    }
  };
}