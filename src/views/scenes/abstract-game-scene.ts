import { Tickable, Updatable } from "../interfaces";
import Core from "../../core/core";

export const TICK_TIME = 5;

export abstract class AbstractGameScene implements Updatable, Tickable {
  protected app: PIXI.Application;
  protected switchSceneTo: (sceneName: string) => void;
  protected sceneContainer: PIXI.Container;
  protected core: Core;
  protected tickTime: number = 0;

  init(
    app: PIXI.Application,
    core: Core,
    switchScene: (sceneName: string) => void
  ): void {
    this.app = app;
    this.core = core;
    this.switchSceneTo = switchScene;
  }

  setSceneContainer(sceneContainer: PIXI.Container): void {
    this.sceneContainer = sceneContainer;
  }

  abstract setup(): void;

  abstract teardown(): void;

  abstract update(delta: number): void;

  updateScene(delta: number): void {
    this.tickTime -= delta;
    if (this.tickTime <= 0) {
      this.tickTime += TICK_TIME;
      this.tick();
    }
    this.update(delta);
  }

  abstract tick(): void;
}
