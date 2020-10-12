import { AbstractGameScene } from "../abstract-game-scene";
import resourceManager from "../../managers/resource-manager";
import {
  CHEST_CLOSED,
  CHEST_OPEN,
  COINS,
  DIAMOND,
  GOLD_BARS,
  GOLD_RING,
  RING,
  ScenesType,
  SHINE,
  SMOKE,
  STAR,
} from "../../constants";
import smokeEmitterConfig from "./smoke-emitter-config";
import startShineConfigData from "./start-shine-config-data";
import treasuresEmitterConfig from "../../particles/treasures-emitter-config";
import eventBus from "../../../core/event-bus";
import { EventType } from "../../../core/enums";
import StarShineConfig from "./star-shine-config";
import {
  CHEST_DROP_TIME,
  RING_SCALE,
  SHINE_LARGE_SCALE,
  SHINE_SMALL_SCALE,
} from "./chest-config";
import { PrizeTextComponent } from "../../components/prize-text-component";
import main from "../../../main";

export class ChestScene extends AbstractGameScene {
  private chest: PIXI.Container;
  private chestClosed: PIXI.Sprite;
  private chestOpened: PIXI.Sprite;
  private shine: PIXI.Sprite;
  private coinStarShineConfig: StarShineConfig[];
  private coinStarShine: PIXI.Sprite[];
  private smokeEmitter: PIXI.particles.Emitter | null;
  private treasuresEmitter: PIXI.particles.Emitter | null;
  private ring: PIXI.Sprite;
  private prizeTextComponent: PrizeTextComponent;

  private time: number;
  private count: number;

  setup() {
    this.time = 0;
    this.count = 0;
    this.coinStarShineConfig = startShineConfigData;
    this.coinStarShine = [];
    const { width, height } = main.size;

    this.chest = new PIXI.Container();

    this.ring = resourceManager.getSpriteCentered(RING);
    this.ring.scale.x = 0.5;
    this.ring.scale.y = 0.5;
    this.chest.addChild(this.ring);

    this.shine = resourceManager.getSpriteCentered(SHINE);
    this.shine.scale.x = SHINE_LARGE_SCALE;
    this.shine.scale.y = SHINE_LARGE_SCALE;
    this.chest.addChild(this.shine);

    this.chestClosed = resourceManager.getSpriteCentered(CHEST_CLOSED);
    this.chest.addChild(this.chestClosed);

    this.chestOpened = resourceManager.getSpriteCentered(CHEST_OPEN);
    this.chestOpened.alpha = 0;
    this.chestOpened.scale.x = 0.5;
    this.chestOpened.scale.y = 0.5;
    this.chest.addChild(this.chestOpened);

    for (let i = 0; i < this.coinStarShineConfig.length; i++) {
      const { x, y } = this.coinStarShineConfig[i];
      const smallCoin = resourceManager.getSpriteCentered(STAR);
      smallCoin.x = x;
      smallCoin.y = y;
      smallCoin.scale.x = SHINE_SMALL_SCALE;
      smallCoin.scale.y = SHINE_SMALL_SCALE;
      this.coinStarShine.push(smallCoin);
      this.chestOpened.addChild(smallCoin);
    }

    this.chest.x = width / 2;
    this.chest.y = -this.chest.height;

    this.sceneContainer.addChild(this.chest);

    this.prizeTextComponent = new PrizeTextComponent();
    this.prizeTextComponent.x = width / 2;
    this.prizeTextComponent.y = height / 2;
    this.sceneContainer.addChild(this.prizeTextComponent);

    gsap.to(this.chest, {
      ease: "bounce.out",
      x: width / 2,
      y: height / 2,
      duration: CHEST_DROP_TIME,
      onComplete: this.playOpenAnimation.bind(this),
    });

    const tl = gsap.timeline();
    tl.to(this.chestClosed.scale, {
      y: 0.9,
      x: 1,
      duration: 1,
      ease: "ease.in",
    });
    tl.to(this.chestClosed.scale, {
      y: 1.1,
      x: 0.9,
      duration: 0.8,
      ease: "ease.out",
    });
    tl.to(this.chestClosed.scale, {
      y: 0.9,
      x: 1,
      duration: 1,
      ease: "ease.in",
    });
    tl.to(this.chestClosed.scale, {
      y: 0.7,
      x: 1.1,
      duration: 0.2,
      ease: "ease.out",
    });
  }

  teardown(): void {
    this.sceneContainer.removeChildren();
    this.chestClosed.removeAllListeners();
    this.smokeEmitter?.cleanup();
  }

  playOpenAnimation() {
    this.smokeEmitter = new PIXI.particles.Emitter(
      this.chest,
      [PIXI.Texture.fromImage(SMOKE)],
      smokeEmitterConfig
    );
    this.smokeEmitter.playOnceAndDestroy();

    this.treasuresEmitter = new PIXI.particles.Emitter(
      this.chest,
      resourceManager.getTextures([GOLD_RING, DIAMOND, GOLD_BARS, COINS]),
      treasuresEmitterConfig(5000, 5, false)
    );
    this.treasuresEmitter.playOnceAndDestroy(this.onTreasureEmitEnd);

    gsap.to(this.chestClosed, {
      ease: "ease.out",
      alpha: 0,
      duration: 1.0,
    });

    gsap.to(this.chestOpened, {
      ease: "ease.in",
      alpha: 1,
      duration: 1.0,
    });

    gsap.to(this.chestOpened.scale, {
      ease: "ease.in",
      x: 1,
      y: 1,
      duration: 1.0,
    });

    gsap.to(this.ring.scale, {
      ease: "ease.in",
      x: RING_SCALE,
      y: RING_SCALE,
      duration: 1.0,
    });

    this.prizeTextComponent.setTargetValue(this.core.winCombo.prize, 8, 100);
  }

  private onTreasureEmitEnd = () => {
    this.prizeTextComponent.clear();
    gsap.to(this.chest, {
      ease: "ease.out",
      alpha: 0,
      duration: 1.0,
      onComplete: async () => {
        this.switchSceneTo(ScenesType.GAME_SCENE);
        await eventBus.publish(EventType.ChestSceneCompleted);
      },
    });
  };

  private updateShineAlpha(coin: PIXI.Sprite) {
    coin.alpha = 0.7 + Math.cos(0.05 * this.time) / 5;
  }

  private updateStarShine(coin: PIXI.Sprite, config: StarShineConfig) {
    const currentIntensity = Math.sin(config.delay + 0.05 * this.time) / 2 + 1;
    const scale = SHINE_SMALL_SCALE * currentIntensity;
    coin.scale.x = scale;
    coin.scale.y = scale;
    coin.rotation = 0.01 * this.time;
    coin.alpha = currentIntensity;
  }

  update(delta: number) {
    if (this.smokeEmitter) {
      this.smokeEmitter.update(delta * 0.01);
    }

    if (this.treasuresEmitter) {
      this.treasuresEmitter.update(delta * 0.01);
    }

    this.time += delta;
    this.updateShineAlpha(this.shine);
    for (let i = 0; i < this.coinStarShine.length; i++) {
      this.updateStarShine(this.coinStarShine[i], this.coinStarShineConfig[i]);
    }

    this.chestOpened.scale.x = 1 + Math.sin(0.05 * this.time) * 0.01;
    this.chestOpened.scale.y = 1 + Math.sin(0.05 * this.time) * 0.01;

    this.ring.rotation += 0.01 * delta;
  }

  tick() {
    this.prizeTextComponent.tick();
  }
}
