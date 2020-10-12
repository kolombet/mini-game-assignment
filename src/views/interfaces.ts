import { AbstractGameScene } from "./scenes/abstract-game-scene";
import { ScenesType } from "./constants";

export interface Updatable {
  update(delta: number): void;
}

export interface Tickable {
  tick(): void;
}

export interface Scene {
  name?: ScenesType;
  gameScene: AbstractGameScene | null;
  sceneFactory: () => AbstractGameScene;
}
