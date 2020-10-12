import resourceManager from "../managers/resource-manager";
import { Tickable } from "../interfaces";
import pulseAnimation from "../scenes/game/pulse-animation";

const CHARACTER_WIDTH = 57;

export class PrizeTextComponent extends PIXI.Sprite implements Tickable {
  private currentlyDisplayedPrize = 0;
  private targetAmountPrize = 0;
  private tweenTicks: number;

  constructor() {
    super();
    this.alpha = 0;
    this.anchor.set(0.5, 0.5);
  }

  setTargetValue(
    value: number,
    pulsesCount: number = 1,
    tweenTicks: number = 10
  ) {
    this.tweenTicks = tweenTicks;
    pulseAnimation(this, 1.2, 0.4, pulsesCount);
    this.alpha = 0;

    gsap.to(this, {
      ease: "ease.out",
      alpha: 1,
      duration: 0.5,
    });

    this.currentlyDisplayedPrize = value / 3;
    this.targetAmountPrize = value;
    this.updatePrizeText();
  }

  clear() {
    this.currentlyDisplayedPrize = 0;
    this.targetAmountPrize = 0;

    gsap.to(this, {
      ease: "ease.in",
      alpha: 0,
      duration: 0.5,
    });

    this.removeChildren();
  }

  tick(): void {
    if (this.targetAmountPrize === 0) {
      return;
    }
    this.currentlyDisplayedPrize += this.targetAmountPrize / this.tweenTicks;
    if (this.currentlyDisplayedPrize >= this.targetAmountPrize) {
      this.currentlyDisplayedPrize = this.targetAmountPrize;
    }
    this.updatePrizeText();
  }

  private updatePrizeText() {
    const text = String(Math.round(this.currentlyDisplayedPrize));
    this.removeChildren();
    const winText = new PIXI.Sprite();
    winText.anchor.set(0, 0.5);
    this.addChild(winText);

    for (let i = 0; i < text.length; i++) {
      const charCode = text[i].charCodeAt(0);
      const isNumber = charCode >= 48 && charCode <= 57;
      const isPeriod = charCode === 46;
      const isComma = charCode === 44;
      if (isNumber || isPeriod || isComma) {
        const spriteName = `font/${charCode}.png`;
        const character = resourceManager.getSprite(spriteName);
        character.anchor.set(0, 0.5);
        character.x = CHARACTER_WIDTH * i;
        winText.addChild(character);
      } else {
        throw new Error("char code not in allowed range");
      }
    }
    winText.x = (-text.length * CHARACTER_WIDTH) / 2;
  }
}
