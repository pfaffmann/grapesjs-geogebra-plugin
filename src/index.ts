import loadComponents from './components';
import loadBlocks from './blocks';
import en from './locale/en';
import { Editor, PluginOptions } from 'grapesjs';
import { Store } from './store';

export default (editor: Editor, opts = {}) => {
  const options: Required<PluginOptions> = {
    ...{
      i18n: {},
      // default options
    },
    addBasicStyle: 'true',
    stylePrefix: 'gjs-',
    ...opts,
  };

  // Add components
  loadComponents(editor, options);
  // Add blocks
  loadBlocks(editor, options);
  // Load i18n files
  editor.I18n &&
    editor.I18n.addMessages({
      en,
      ...options.i18n,
    });

  editor.on('load', () => {
    //create Global Variable for the store
    if (window.frames[1]) {
      window.frames[1]['ggbStore'] = new Store();
    }
  });
};
