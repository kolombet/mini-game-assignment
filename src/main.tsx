import resourceManager from "./views/managers/resource-manager";
import { SceneManager } from "./views/managers/scene-manager";
import { ChestScene } from "./views/scenes/chest/chest-scene";
import { GameScene } from "./views/scenes/game/game-scene";
import { ScenesType } from "./views/constants";
import Core from "./core/core";

class Main {
  public app: PIXI.Application;
  public core: Core;
  public size: Size;

  private scenesManager: SceneManager;
  private gStats: Stats;
  private isInitialized = false;

  public async init() {
    const mainCanvas: HTMLCanvasElement = document.getElementById(
      "main-canvas"
    ) as HTMLCanvasElement;
    if (!mainCanvas) {
      console.error("No main-mainCanvas found");
      return;
    }

    if (!PIXI.utils.isWebGLSupported()) {
      console.error("Webgl is not supported");
      return;
    }

    const config = { view: mainCanvas };
    this.app = new PIXI.Application(config);

    const GStats = (window as any).GStats;
    if (GStats) {
      const pixi_gstats = new GStats.PIXIHooks(this.app);
      this.gStats = new GStats.StatsJSAdapter(pixi_gstats);
      this.gStats.stats.showPanel(0);
      document.body.appendChild(
        this.gStats.stats.dom || this.gStats.stats.domElement
      );
    }

    await resourceManager.init();

    this.size = new Size();
    this.resize();

    this.initScenes();
    window.addEventListener("resize", this.resize.bind(this));
  }

  mainLoop(delta: number) {
    if (!this.scenesManager) {
      console.error("scene manager should exist");
      return;
    }
    if (this.gStats) {
      this.gStats.update();
    }
    if (this.core) {
      this.core.update(delta);
    }
    this.scenesManager.update(delta);
  }

  resize() {
    const { innerWidth, innerHeight } = window;
    this.size.setSize(innerWidth, innerHeight);
    this.app.renderer.resize(innerWidth, innerHeight);
  }

  initScenes() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    this.core = new Core();

    this.scenesManager = new SceneManager(
      this.app,
      this.core,
      [
        {
          name: ScenesType.CHEST_SCENE,
          sceneFactory: () => new ChestScene(),
          gameScene: null,
        },
        {
          name: ScenesType.GAME_SCENE,
          sceneFactory: () => new GameScene(),
          gameScene: null,
        },
      ],
      ScenesType.GAME_SCENE
    );
    this.app.ticker.add(this.mainLoop.bind(this));
    this.app.ticker.speed = 1;
    this.core.startGameCycle();
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

export class Size {
  width: number;
  height: number;

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

const main = new Main();

// @ts-ignore
window.main = main;

export default main;
