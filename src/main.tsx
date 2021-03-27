import { Graphics, Sprite } from "pixi.js";
import resources from "resources";

class Icon {
  private segments = 200;
  private _container: PIXI.Sprite;
  private bankImage: PIXI.Sprite;
  private semicircles: Graphics[];
  private _time: number = 0;
  private _previousTick: number = 0;
  private _timeSeconds: number = 0;
  private _app: PIXI.Application;
  private _isCooldown: boolean = false;
  private cooldownTime = 10 * 100;
  
  
  constructor(pixiInstance:PIXI.Application) {
    this._app = pixiInstance;
    this._container = new PIXI.Sprite();
    this._app.stage.addChild(this._container);

    const wholeMask = new PIXI.Graphics();
    wholeMask.beginFill(0xffffff, 1);
    wholeMask.drawRect(0, 0, this.width, this.height);
    this._container.addChild(wholeMask);
    this._container.mask = wholeMask;

    this.init();
  }

  setPosition(x, y) {
    this._container.position.set(x, y);
  }

  get width() {
    return 64;
  }

  get height() {
    return 64;
  }

  _setFill(fillAmount: number) {
    if (!this._isCooldown) return;

    const semicirclesToFill = (this.segments * 2) * fillAmount;
    console.log(semicirclesToFill);

    if (fillAmount >= 1) {
      this._isCooldown = false;
      for (let i = 0; i < this.semicircles.length; i++) {
        this.semicircles[i].visible = false;    
      }
      return;
    }
    for (let i = 0; i < this.semicircles.length; i++) {
      const isVisible = i > semicirclesToFill;
      this.semicircles[i].visible = isVisible;    
    }
  }

  mainLoop(delta: number) {
    this._time += delta;
    const currentTick = Math.floor(this._time / 10);
    if (this._previousTick !== currentTick) {
      this._previousTick = currentTick;
      this._setFill(this._time/this.cooldownTime);
    }
  }

  _onSkillClick(e) {
    this._time = 0;
    this._isCooldown = true;
  }

  init() {
    const sW = 64;
    const sH = 64;

    this.bankImage = resources.getSprite('icon.png');
    this.bankImage.interactive = true;
    this.bankImage.on('click', this._onSkillClick.bind(this));
    this._container.addChild(this.bankImage);

    this.semicircles = [];
    for (let i = 0; i < this.segments * 2; i++) {
    	var semicircle = new PIXI.Graphics();
      semicircle.interactive = false;
      semicircle.beginFill(0x000000);
      semicircle.lineStyle(0, 0x000000);
      semicircle.moveTo(0, 0);
      semicircle.arc(0, 0, 100, 0, Math.PI/this.segments); 
      semicircle.position.set(sW/2, sH/2)
      semicircle.rotation = i * Math.PI/this.segments;
      semicircle.alpha = .5;
      this.semicircles.push(semicircle);
      this._container.addChild(semicircle);
      semicircle.visible = false;
    }

    this._app.ticker.add(this.mainLoop.bind(this));
    this._app.ticker.speed = 1;
  }
}

class Main {
  private _canvases: HTMLCollectionOf<Element>;
  public _apps: PIXI.Application[] = [];
  private _icons : Icon[] = [];

  private _w: number = 0;
  private _h: number = 0;

  private gStats: Stats;

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
    if (GStats) {
      const pixi_gstats = new GStats.PIXIHooks(this._apps[0]);
      this.gStats = new GStats.StatsJSAdapter(pixi_gstats);
      this.gStats.stats.showPanel(0);
      document.body.appendChild(
        this.gStats.stats.dom || this.gStats.stats.domElement
      );
    }
    this._apps[0].ticker.add(() => {
      if (this.gStats) {
        this.gStats.update();
      } 
    });

    this.resize();


    for (let i = 0; i < 100; i++) {
      const icon = new Icon(this._apps[0]);
      this._icons.push(icon);
    }
    this.updateIconsPosition();

    

    window.addEventListener("resize", this.resize.bind(this));
  }

  updateIconsPosition() {
    for (let i = 0; i < this._icons.length; i++) {
      const icon = this._icons[i];
      const xOffset = 10;
      const yOffset = 5;
      const iconsInRow = Math.floor((this._w - xOffset * 2) / (icon.width + 10));
      const row = Math.floor(i / iconsInRow);
      const x = (icon.width + xOffset) * (i % iconsInRow) + xOffset;
      const y = yOffset + (icon.height + yOffset) * row;
      if (row > 1) {
        // debugger;
      }

      icon.setPosition(x, y);
    }
  }

  update() {
    
  }
  

  resize() {
    // this.size.setSize(innerWidth, innerHeight);
    for (let i = 0; i < this._apps.length; i++) {
      const canvas = this._canvases[i];
      const innerWidth = canvas['offsetWidth'];
      const innerHeight = canvas['offsetHeight'];
      this._w = window.innerWidth;
      this._h = 2000;
      canvas['height'] = this._h;
      this._apps[i].renderer.resize(window.innerWidth, window.innerHeight);
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
