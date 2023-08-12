import { Component, Editor } from 'grapesjs';
import { script } from './script';
import { traits } from './traits';
import { generateRandomId } from './util';
import { Store } from './store';

declare global {
  interface Window {
    GGBApplet: any;
    ggbStore: any;
  }
}

export default (editor: Editor, opts = {}) => {
  const domc = editor.DomComponents;
  const tm = editor.TraitManager;

  tm.addType('ggb-id-disabled', {
    createInput({ component }) {
      console.log(component);
      const el = document.createElement('div');
      el.innerHTML = `
      <input class="text-disabled__type" type="text" disabled value="${component.ccid}" />`;
      return el;
    },
    createLabel({ label }) {
      return `<div>
      ${label}
    </div>`;
    },
  });

  domc.addType('geogebra', {
    extend: 'default',
    extendView: 'default',

    model: {
      defaults: {
        tagName: 'div',
        draggable: true,
        droppable: false,
        attributes: { identifier: 'ggb' },
        script,
        //props default value
        width: 800,
        height: 600,
        appName: 'classic',
        showAlgebraInput: true,
        showMenuBar: true,
        showToolBar: true,
        showToolBarHelp: true,
        enableRightClick: true,
        randomize: true,
        enableFileFeatures: true,
        enableUndoRedo: true,
        algebraInputPosition: 'algebra',
        allowStyleBar: true,
        traits,
        'script-props': [
          'appName',
          'showAlgebraInput',
          'showMenuBar',
          'showToolBar',
          'width',
          'height',
          'material_id',
          'filename',
          'ggbBase64',
          'borderColor',
          'enableRightClick',
          'enableLabelDrags',
          'enableShiftDragZoom',
          'showZoomButtons',
          'errorDialogsActive',
          'showToolBar',
          'showAlgebraInput',
          'showMenuBar',
          'showToolBarHelp',
          'customToolBar',
          'showResetIcon',
          'language',
          'country',
          'allowStyleBar',
          'useBrowserForJS',
          'showLogging',
          'capturingThreshold',
          'enableFileFeatures',
          'perspective',
          'enable3d',
          'enableCAS',
          'algebraInputPosition',
          'preventFocus',
          'scaleContainerClass',
          'autoHeight',
          'allowUpscale',
          'playButton',
          'scale',
          'disableAutoScale',
          'allowAutoScale',
          'clickToLoad',
          'showAnimationButton',
          'showFullscreenButton',
          'showSuggestionButtons',
          'showStartTooltip',
          'rounding',
          'buttonShadows',
          'buttonRounding',
          'buttonBorderColor',
          'editorBackgroundColor',
          'editorForegroundColor',
          'textmode',
          'keyboardType',
        ],
      },
    },
    view: {},
  });

  editor.on('component:remove', (component: Component) => {
    if (component.attributes.type !== 'geogebra') return;
    const store = window.frames[1]['ggbStore'];
    if (!store) alert('no store');
    store.removeApplet(component.ccid);
  });
};
