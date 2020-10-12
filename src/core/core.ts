import { WinCombinations } from "./interfaces";
import balanceService from "../services/balance-service";
import Helper from "./helper";
import Signal from "./signals";
import { EventType, GameStates, WinCombo, WinType } from "./enums";
import eventBus, { Receiver } from "./event-bus";
import {
  INITIAL_SCORE,
  MAX_COMBINATION_SIZE,
  SHOW_BIG_WIN_INDEX,
  SPIN_PRICE,
  SPIN_TIME,
  WAIT_AFTER_SPIN,
  WIN_TIME,
} from "./contants";

export default class Core implements Receiver {
  private readonly winCombinations: WinCombinations[];
  private readonly possibleSymbols: string[];
  private prizeBySymbol: Map<string, WinCombinations>;

  private currentCombo = 0;
  private combination: string[];

  public combinationRoll: Signal<string[]>;
  public win: Signal<WinCombo>;

  private stateTime: number;

  private _gameState: GameStates;
  public onStateChange: Signal<GameStates>;

  public onScoreChange: Signal<string>;
  private _score: number;

  private _winCombo: WinCombo;

  private set score(value: number) {
    this._score = value;
    this.onScoreChange.dispatch(String(value));
  }

  private get score(): number {
    return this._score;
  }

  public getScore(): string {
    return String(this._score);
  }

  get gameState(): GameStates {
    return this._gameState;
  }

  set gameState(state: GameStates) {
    console.log("set state: " + state);
    this.onStateChange.dispatch(state);
    this._gameState = state;
  }

  get winCombo(): WinCombo {
    return this._winCombo;
  }

  constructor() {
    this.onStateChange = new Signal<GameStates>();
    this.prizeBySymbol = new Map<string, WinCombinations>();
    this.combinationRoll = new Signal<string[]>();
    this.win = new Signal<WinCombo>();
    this.onScoreChange = new Signal<string>();

    this.stateTime = 0;

    this.winCombinations = balanceService.winCombinations();
    for (let i = 0; i < this.winCombinations.length; i++) {
      const combination = this.winCombinations[i];
      this.prizeBySymbol.set(combination.symbol, combination);
    }
    this.possibleSymbols = this.winCombinations.map((probability) => {
      return probability.symbol;
    });

    eventBus.subscribe(this);
  }

  startGameCycle() {
    this.score = INITIAL_SCORE;
    this.stateTime = SPIN_TIME;
    this.setState(GameStates.CombinationSpin);
  }

  private setState(state: GameStates) {
    switch (state) {
      case GameStates.CombinationSpin:
        if (this.score >= SPIN_PRICE) {
          this.score -= SPIN_PRICE;
          this.stateTime = SPIN_TIME;
          this.generateCombination();
        } else {
          this.gameState = GameStates.Pause;
        }
        break;
      case GameStates.WaitAfterSpin:
        this.stateTime = WAIT_AFTER_SPIN;
        break;
      case GameStates.WinPause:
        this.stateTime = WIN_TIME;
        break;
      case GameStates.BigWinPause:
        break;
    }
    this.gameState = state;
  }

  update(delta: number) {
    if (
      this.gameState === GameStates.Pause ||
      this.gameState === GameStates.BigWinPause
    ) {
      return;
    }

    const dt = delta * 0.01;
    this.stateTime -= dt;

    if (this.stateTime <= 0) {
      switch (this._gameState) {
        case GameStates.CombinationSpin:
          const winCombo = this.checkForWinCombinations(this.combination);
          if (winCombo) {
            if (winCombo.winType === WinType.Big) {
              this.setState(GameStates.BigWinPause);
            } else {
              this.setState(GameStates.WinPause);
            }
            this._winCombo = winCombo;
            this.win.dispatch(winCombo);
            this.score += winCombo.prize;
          } else {
            this.setState(GameStates.WaitAfterSpin);
          }
          break;
        case GameStates.WinPause:
          this.setState(GameStates.CombinationSpin);
          break;
        case GameStates.BigWinPause:
          break;
        case GameStates.WaitAfterSpin:
          this.setState(GameStates.CombinationSpin);
          break;
        default:
          throw new Error("all states should be handled");
      }
    }
  }

  private generateCombination() {
    this.currentCombo++;

    const isWin = this.currentCombo === SHOW_BIG_WIN_INDEX;
    this.combination = isWin
      ? this.getWinCombination()
      : this.getRandomCombination();

    this.combinationRoll.dispatch(this.combination);
  }

  private getWinCombination() {
    const symbol = Helper.getRandomElement(this.possibleSymbols);
    return [symbol, symbol, symbol];
  }

  private getRandomCombination() {
    const combination: string[] = [];
    for (let i = 0; i < MAX_COMBINATION_SIZE; i++) {
      const symbol = Helper.getRandomElement(this.possibleSymbols);
      combination.push(symbol);
    }
    return combination;
  }

  private checkForWinCombinations(combination: string[]): WinCombo | null {
    for (let i = 0; i < combination.length; i++) {
      const winSymbol = combination[i];
      const matches = combination.filter((item) => item === winSymbol).length;

      if (matches > 1) {
        const winCombination = this.prizeBySymbol?.get(winSymbol);
        if (!winCombination) {
          throw new Error("Prize not described");
        }
        const winType =
          matches === MAX_COMBINATION_SIZE ? WinType.Big : WinType.Normal;
        const { bigWinPrize, winPrize } = winCombination;
        const prize = winType === WinType.Big ? bigWinPrize : winPrize;

        return {
          winSymbol,
          winType,
          prize,
          matches,
        };
      }
    }
    return null;
  }

  receive(event: EventType) {
    if (event === EventType.ChestSceneCompleted) {
      this.setState(GameStates.CombinationSpin);
    }
  }
}
