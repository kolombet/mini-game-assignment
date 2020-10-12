import { Scene } from "../interfaces";
import Core from "../../core/core";

export class SceneManager {
  private currentSceneController: Scene;
  private currentSceneContainer: PIXI.Container;

  constructor(
    private readonly app: PIXI.Application,
    private core: Core,
    private scenes: Scene[],
    private startupSceneName: string
  ) {
    const firstScene = this.scenes.find(
      (scene) => scene.name === startupSceneName
    );

    if (!firstScene) {
      throw new Error("startup scene not found: " + startupSceneName);
    }
    this.setupScene(firstScene);
  }

  switchSceneTo = (sceneName: string) => {
    //clear previous scene
    if (this.currentSceneController?.gameScene) {
      this.currentSceneController.gameScene.teardown();
    }

    if (this.currentSceneContainer) {
      this.app.stage.removeChild(this.currentSceneContainer);
    }

    const scene = this.scenes.find((sceneSettings) => {
      return sceneSettings.name === sceneName;
    });

    if (scene) {
      this.setupScene(scene);
    } else {
      throw new Error("SCENE NOT FOUND: " + sceneName);
    }
  };

  setupScene(scene: Scene) {
    this.currentSceneController = scene;
    this.currentSceneContainer = new PIXI.Container();

    this.app.stage.addChild(this.currentSceneContainer);
    if (!scene.gameScene) {
      scene.gameScene = scene.sceneFactory();
      scene.gameScene.init(this.app, this.core, this.switchSceneTo);
    }
    scene.gameScene.setSceneContainer(this.currentSceneContainer);
    scene.gameScene.setup();
  }

  update(delta: number) {
    if (this.currentSceneController?.gameScene) {
      this.currentSceneController.gameScene.updateScene(delta);
    }
  }
}
