import { Graphics, Sprite } from "pixi.js";
import resources from "resources";
import Icon from "icon";


class Main {
  private _canvases: HTMLCollectionOf<Element>;
  public _apps: PIXI.Application[] = [];
  private _icons : Icon[] = [];

  private _w: number = 0;
  private _h: number = 0;

  private gStats: Stats;
  private _numbersLayer: PIXI.Sprite;
  private _darkOverlayLayer: PIXI.Sprite;
  private _iconsLayer: PIXI.Sprite;

  public async init() {
    this._canvases  = document.getElementsByClassName(
      "icon-canvas"
    );
    if (!this._canvases) {
      console.error("No canvases found");
      return;
    }

    await resources.init();

    if (!PIXI.utils.isWebGLSupported()) {
      console.error("Webgl is not supported");
      return;
    }

    for (let i = 0; i < this._canvases.length; i++) {
      const canvas = this._canvases[i] as HTMLCanvasElement;
      this._apps.push(new PIXI.Application({ view: canvas }));
    }
    
    const GStats = (window as any).GStats;
    const overlay = document.getElementById('html-overlay');
    if (GStats && overlay) {
      const pixi_gstats = new GStats.PIXIHooks(this._apps[0]);
      this.gStats = new GStats.StatsJSAdapter(pixi_gstats);
      this.gStats.stats.showPanel(0);
      overlay.appendChild(
        this.gStats.stats.dom || this.gStats.stats.domElement
      );
    }
    this._apps[0].ticker.add(() => {
      if (this.gStats) {
        this.gStats.update();
      } 
    });

    this.resize();

    this._iconsLayer = new PIXI.Sprite();
    this._darkOverlayLayer = new PIXI.Sprite();
    this._numbersLayer = new PIXI.Sprite();

    for (let i = 0; i < 210; i++) {
      const icon = new Icon(this._apps[0], i+1, this._numbersLayer, this._iconsLayer, this._darkOverlayLayer);
      this._icons.push(icon);
    }

    this._apps[0].stage.addChild(this._iconsLayer);
    this._apps[0].stage.addChild(this._darkOverlayLayer);
    this._apps[0].stage.addChild(this._numbersLayer);
    this.updateIconsPosition();

    window.addEventListener("resize", this.resize.bind(this));
  }

  updateIconsPosition() {
    for (let i = 0; i < this._icons.length; i++) {
      const icon = this._icons[i];
      const xOffset = 4;
      const yOffset = 4;
      const iconsInRow = Math.floor((this._w - xOffset * 2) / icon.width);
      const row = Math.floor(i / iconsInRow);
      const x = (icon.width + xOffset) * (i % iconsInRow) + xOffset/2;
      const y = (icon.height + yOffset) * row + yOffset /2;
      icon.setPosition(x, y);
    }
  }

  resize() {
    // this.size.setSize(innerWidth, innerHeight);
    for (let i = 0; i < this._apps.length; i++) {
      const canvas = this._canvases[i];
      // const innerWidth = canvas['offsetWidth'];
      // const innerHeight = canvas['offsetHeight'];
      this._w = document.body.offsetWidth - 50;
      // this._h = document.body.offsetHeight;
      this._h = 3500;
      canvas['width'] = this._w;
      canvas['height'] = this._h;
      this._apps[i].renderer.resize(this._w, this._h);
    }

    this.updateIconsPosition();
  }
}

interface Stats {
  update(): void;

  stats: {
    dom: HTMLElement;
    domElement: HTMLElement;
    showPanel(index: number): void;
  };
}

// export class Size {
//   width: number;
//   height: number;

//   setSize(width: number, height: number) {
//     this.width = width;
//     this.height = height;
//   }
// }

const main = new Main();

// @ts-ignore
window.main = main;

export default main;
