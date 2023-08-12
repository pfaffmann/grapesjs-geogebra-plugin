import { makeAutoObservable } from 'mobx';
import { Applet } from './types/geogebra';
import merge from 'lodash.merge';

const removeApplet = (applets: Applet[], id: string): Applet[] =>
  applets.filter((applet) => applet.id !== id);

const addApplet = (applets: Applet[], applet: Applet) => [...applets, applet];

const updateApplet = (
  applets: Applet[],
  id: string,
  data: Partial<Applet>
): Applet[] => applets.map((a) => (a.id === id ? merge(a, data) : a));

export class Store {
  applets: Applet[] = [];
  updatedApplet: Partial<Applet> = {};

  constructor() {
    makeAutoObservable(this);
  }
  addApplet(applet: Applet) {
    this.applets = addApplet(this.applets, applet);
  }

  removeApplet(id: string) {
    this.applets = removeApplet(this.applets, id);
  }
  updateApplet(id: string, data: Partial<Applet>) {
    this.applets = updateApplet(this.applets, id, data);
  }
}
