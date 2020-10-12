export interface WinCombo {
  winSymbol: string;
  winType: WinType;
  matches: number;
  prize: number;
}

export enum WinType {
  Normal,
  Big,
}

export enum GameStates {
  CombinationSpin = "SPIN",
  WaitAfterSpin = "SPIN_FINISHED",
  WinPause = "WIN",
  BigWinPause = "BIG_WIN",
  Pause = "PAUSE_GAME",
}

export enum EventType {
  ChestSceneCompleted,
}
