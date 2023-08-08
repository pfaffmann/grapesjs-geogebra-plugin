import { Editor } from 'grapesjs';
import { script } from './script';
import { traits } from './traits';
import { generateRandomId } from './util';

declare global {
  interface Window {
    GGBApplet: any;
  }
}

export default (editor: Editor, opts = {}) => {
  const domc = editor.DomComponents;

  const id = generateRandomId({ prefix: 'ggb-', size: 3 });

  domc.addType('geogebra', {
    model: {
      defaults: {
        tagName: 'div',
        script,
        //props default value
        attributes: { id: `container-${id}`, identifier: 'ggb' },
        appName: 'classic',
        showAlgebraInput: true,
        traits,
        'script-props': [
          'appName',
          'showAlgebraInput',
          'showMenuBar',
          'showToolBar',
          'geogebraURL',
        ],
      },
    },
    view: {},
  });
};
