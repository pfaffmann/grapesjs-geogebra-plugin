import { GeoGebraAPI } from './types/geogebra';

export const script = function (props: any) {
  const geogebraURL = 'https://www.geogebra.org/apps/deployggb.js';
  const initGGB = () => {
    //const { ggbId } = props;

    const els = document.querySelectorAll('[identifier="ggb"]');
    //it is not possible to have '-' in window[id]
    const id = els[els.length - 1].id
      .replace('container-', '')
      .replace('-', '_');
    els[els.length - 1].id = `container-${id}`;

    let params = Object.assign(
      {
        id: id,
        width: 800,
        height: 600,
        showToolBar: true,
        showMenuBar: true,
      },
      props
    );

    var applet = new window.GGBApplet(params, true);
    console.log(id);
    applet.inject(`container-${id}`);

    const el = document.getElementById(`container-${id}`);
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
