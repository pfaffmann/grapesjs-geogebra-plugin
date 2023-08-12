import { Store } from './store';
import {
  Applet,
  GeoGebraAPI,
  GeoGebraElement,
  ReactGeoGebraParameters,
  XYZPosition,
} from './types/geogebra';

export const geogebraScript = function (props: any) {
  const geogebraElementFromApi = (label: string, api: Applet['api']) => {
    const objectType = api.getObjectType(label);
    let coordinates: XYZPosition | undefined = undefined;
    switch (objectType) {
      case 'point':
        coordinates = {
          x: api.getXcoord(label),
          y: api.getYcoord(label),
          z: api.getZcoord(label),
        };
        break;

      default:
        break;
    }

    const element: GeoGebraElement = {
      label,
      coordinates,
      value: api.getValue(label),
      color: api.getColor(label),
      isVisible: api.getVisible(label),
      valueString: api.getValueString(label),
      definitionString: api.getDefinitionString(label),
      commandString: api.getCommandString(label),
      LaTeXString: api.getLaTeXString(label),
      objectType,
      isExisting: api.exists(label),
      isDefined: api.isDefined(label),
      layer: api.getLayer(label),
      lineStyle: api.getLineStyle(label),
      lineThickness: api.getLineThickness(label),
      pointStyle: api.getPointStyle(label),
      pointSize: api.getPointSize(label),
      filling: api.getFilling(label),
      caption: api.getCaption(label),
      labelStyle: api.getLabelStyle(label),
      isLabelVisible: api.getLabelVisible(label),
      isIndependent: api.isIndependent(label),
      isMoveable: api.isMoveable(label),
      xml: api.getXML(label),
    };

    return element;
  };

  const addListener = (app: Applet, store: Store) => (label: string) => {
    if (!label) return;
    const { id, api, log } = app;
    const element = geogebraElementFromApi(label, api);

    store.updateApplet(id, { elements: { [label]: element } });
    log(label + ' is added');
  };

  const updateListener = (app: Applet, store: Store) => (label: string) => {
    if (!label) return;
    const { id, api, log } = app;
    const element = geogebraElementFromApi(label, api);
    store.updateApplet(id, { elements: { [label]: element } });
    log(label + ' is updated');
  };

  const removeListener = (app: Applet, store: Store) => (label: string) => {
    const { id, log } = app;
    if (!id) return;
    const a = store.applets.find((applet) => applet.id === id);
    if (!a) return;
    delete a?.elements[label];
    log(label + ' is removed');
  };

  const renameListener =
    (app: Applet, store: Store) => (oldLabel: string, newLabel: string) => {
      const { id, log } = app;
      if (!id) return;
      const a = store.applets.find((applet) => applet.id === id);
      if (!a) return;
      a.elements[newLabel] = a.elements[oldLabel];
      delete a.elements[oldLabel];
      log(`${oldLabel} is renamed to ${newLabel}`);
    };

  const registerListeners = (app: Applet, store: Store) => {
    const { api } = app;
    api.registerAddListener(addListener(app, store));
    api.registerUpdateListener(updateListener(app, store));
    api.registerRemoveListener(removeListener(app, store));
    api.registerRenameListener(renameListener(app, store));
  };

  const geogebraURL = 'https://www.geogebra.org/apps/deployggb.js';
  const initGGB = () => {
    //const { ggbId } = props;

    const els = document.querySelectorAll('[identifier="ggb"]');
    //it is not possible to have '-' in window[id]
    const origId = els[els.length - 1].id;
    const id = origId.replace(/(container-)/g, '').replace(/(-)/g, '_');
    //always the last one from the list
    const element = els[els.length - 1] as HTMLElement;
    element.className = id;
    element.innerHTML = `<div id="container-${id}"></div>`;

    let params: ReactGeoGebraParameters = Object.assign(
      {
        id,
        appletOnLoad: (api: GeoGebraAPI) => {
          const store = window['ggbStore'];
          const applet = {
            id: origId,
            api,
            elements: {},
            views2D: {},
            view3D: {},
            mouse: { viewNo: 0, viewName: '', x: 0, y: 0, hits: [] },
            mode: { number: -1, name: '' },
            selectedElements: [],
            log: console.log,
          };

          registerListeners(applet, store);

          store.addApplet(applet);
        },
      } as ReactGeoGebraParameters,
      props
    );

    var applet = new window.GGBApplet(params, true);
    applet.inject(`container-${id}`);

    const el = document.getElementById(origId);
    el?.removeAttribute('identifier'); //remove identifier to only have one element in els
  };

  if (typeof window.GGBApplet === 'undefined') {
    const scriptEl = document.createElement('script');
    scriptEl.src = geogebraURL;
    document.body.appendChild(scriptEl);
  }

  setTimeout(() => {
    initGGB();
  }, 100);
};
