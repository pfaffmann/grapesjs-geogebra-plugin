import { GeoGebraAPI, ReactGeoGebraParameters } from './types/geogebra';

export const script = function (props: any) {
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
          store.newApplet = {
            id,
            api,
            elements: {},
            views2D: {},
            view3D: {},
            mouse: { viewNo: 0, viewName: '', x: 0, y: 0, hits: [] },
            mode: { number: -1, name: '' },
            selectedElements: [],
            log: console.log,
          };
          store.addApplet();
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
    scriptEl.onload = initGGB;
    scriptEl.src = geogebraURL;
    document.body.appendChild(scriptEl);
  } else {
    initGGB();
  }
};
