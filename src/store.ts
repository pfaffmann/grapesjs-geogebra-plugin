import { makeAutoObservable } from 'mobx';
import { Applet } from './types/geogebra';

const removeApplet = (applets: Applet[], id: string): Applet[] =>
  applets.filter((applet) => applet.id !== id);

const addApplet = (applets: Applet[], applet: Applet) => [...applets, applet];

const updateApplet = (
  applets: Applet[],
  id: string,
  applet: Applet
): Applet[] => applets.map((a) => (a.id === id ? applet : a));

export class Store {
  applets: Applet[] = [];
  newApplet: Partial<Applet> = {};
  updatedApplet: Partial<Applet> = {};

  constructor() {
    makeAutoObservable(this);
  }
  addApplet() {
    this.applets = addApplet(this.applets, this.newApplet as Applet);
    this.newApplet = {};
  }

  removeApplet(id: string) {
    this.applets = removeApplet(this.applets, id);
  }
  updateApplet(id: string) {
    this.applets = updateApplet(this.applets, id, this.updatedApplet as Applet);
  }
}

export const store = new Store();
