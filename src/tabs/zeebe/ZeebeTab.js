import ZeebeEditor from './ZeebeEditor';
import XMLEditor from '/Users/niklas.kiefer/Github/camunda-modeler/client/src/app/tabs/xml';

import { createTab } from '/Users/niklas.kiefer/Github/camunda-modeler/client/src/app/tabs/EditorTab';


const ZeebeTab = createTab('ZeebeTab', [
  {
    type: 'bpmn',
    editor: ZeebeEditor,
    defaultName: 'Diagram'
  },
  {
    type: 'xml',
    editor: XMLEditor,
    isFallback: true,
    defaultName: 'XML'
  }
]);

export default ZeebeTab;