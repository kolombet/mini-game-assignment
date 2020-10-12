import { AbstractGameScene } from "../abstract-game-scene";
import resourceManager from "../../managers/resource-manager";
import { BAG, COINS, GOLD_BARS, ScenesType } from "../../constants";
import balanceService from "../../../services/balance-service";
import Helper from "../../../core/helper";
import pulseAnimation from "./pulse-animation";
import treasuresEmitterConfig from "../../particles/treasures-emitter-config";
import { WinCombo, WinType } from "../../../core/enums";
import { PrizeTextComponent } from "../../components/prize-text-component";
import { Tickable } from "../../interfaces";
import { TEXT_COLOR } from "./game-scene-config";
import main from "../../../main";
import { MAX_COMBINATION_SIZE } from "../../../core/contants";

export class GameScene extends AbstractGameScene implements Tickable {
  private gems: PIXI.Sprite;
  private prizeTextComponent: PrizeTextComponent;

  private gemSprites: PIXI.Sprite[];
  private isSlotSpinning: boolean[];
  private spinTimeTicks: number[];

  private bankText: PIXI.Text;
  private bankImage: PIXI.Sprite;

  private symbols: string[];
  private treasuresEmitter: PIXI.particles.Emitter | null;

  private currentCombination: string[] = [];

  setup() {
    const { width, height } = main.size;

    this.isSlotSpinning = [false, false, false];
    this.spinTimeTicks = [0, 0, 0];
    this.symbols = balanceService.getPossibleSymbols();

    this.gems = new PIXI.Sprite();
    this.gems.anchor.set(0.5, 0.5);
    this.gems.x = width / 2;
    this.gems.y = height / 2;
    this.sceneContainer.addChild(this.gems);

    this.gemSprites = [];
    for (let i = 0; i < MAX_COMBINATION_SIZE; i++) {
      const sprite = new PIXI.Sprite();
      sprite.x = 200 * (i - 1);
      sprite.anchor.set(0.5, 0.5);
      this.gems.addChild(sprite);
      this.gemSprites.push(sprite);
    }

    this.prizeTextComponent = new PrizeTextComponent();
    this.prizeTextComponent.x = width / 2;
    this.prizeTextComponent.y = height / 2;
    this.sceneContainer.addChild(this.prizeTextComponent);

    this.bankText = new PIXI.Text(this.core.getScore(), { fill: TEXT_COLOR });

    const bankLabelY = 80;

    this.bankText.x = width - 100;
    this.bankText.y = bankLabelY;
    this.bankText.anchor.set(0.5, 0.5);
    this.sceneContainer.addChild(this.bankText);

    this.bankImage = resourceManager.getSpriteCentered(BAG);
    this.bankImage.y = bankLabelY;
    this.bankImage.x = this.bankText.x - 60;
    this.sceneContainer.addChild(this.bankImage);

    this.core.combinationRoll.add(this.onCombinationRoll);
    this.core.win.add(this.onPrizeWin);
    this.core.onScoreChange.add(this.onScoreChange);
  }

  teardown() {
    this.gems.removeChildren();
    this.gems.removeAllListeners();
    this.core.combinationRoll.clear(this.onCombinationRoll);
    this.core.win.clear(this.onPrizeWin);
    this.core.onScoreChange.clear(this.onScoreChange);
  }

  onScoreChange = (score: string) => {
    this.bankText.text = score;
  };

  onPrizeWin = (winCombo: WinCombo) => {
    if (winCombo.winType === WinType.Big) {
      gsap.to(this.gems, {
        ease: "ease.out",
        alpha: 0,
        duration: 1.0,
        onComplete: async () => {
          this.switchSceneTo(ScenesType.CHEST_SCENE);
        },
      });

      return;
    }
    this.prizeTextComponent.setTargetValue(winCombo.prize);

    this.treasuresEmitter = new PIXI.particles.Emitter(
      this.gems,
      [
        resourceManager.getTexture(GOLD_BARS),
        resourceManager.getTexture(COINS),
      ],
      treasuresEmitterConfig(winCombo.prize * 10)
    );
    this.treasuresEmitter.playOnceAndDestroy();

    for (let i = 0; i < this.currentCombination.length; i++) {
      if (this.currentCombination[i] === winCombo.winSymbol) {
        pulseAnimation(this.gemSprites[i], 1.2, 0.2, 5);
      }
    }
  };

  onCombinationRoll = (combination: string[]) => {
    if (combination?.length !== MAX_COMBINATION_SIZE) {
      throw new Error("core should provide correct amount of combinations");
    }

    this.currentCombination = combination;
    this.prizeTextComponent.clear();

    this.isSlotSpinning = [true, true, true];
    this.spinTimeTicks = [8, 13, 18];
  };

  update(delta: number) {
    if (this.treasuresEmitter) {
      this.treasuresEmitter.update(delta * 0.01);
    }
  }

  private getGemAssetById(id: string) {
    return `gems/${id}.png`;
  }

  private setSymbolToSlot(symbol: string, slot: number) {
    this.gemSprites[slot].texture = resourceManager.getTexture(
      this.getGemAssetById(symbol)
    );
  }

  tick(): void {
    this.prizeTextComponent.tick();
    for (let i = 0; i < this.spinTimeTicks.length; i++) {
      this.spinTimeTicks[i]--;
      const randomSymbol = Helper.getRandomElement(this.symbols);
      if (this.spinTimeTicks[i] <= 0) {
        this.setSymbolToSlot(this.currentCombination[i], i);
      } else {
        this.setSymbolToSlot(randomSymbol, i);
      }
    }
  }
}
