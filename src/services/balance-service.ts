import { WinCombinations } from "../core/interfaces";

/**
 * Symbols/scores external service provider.
 */
class BalanceService {
  winCombinations(): WinCombinations[] {
    return [
      {
        symbol: "blue",
        winPrize: 100,
        bigWinPrize: 5000,
      },
      {
        symbol: "red",
        winPrize: 500,
        bigWinPrize: 10000,
      },
      {
        symbol: "orange",
        winPrize: 300,
        bigWinPrize: 7000,
      },
      {
        symbol: "green",
        winPrize: 600,
        bigWinPrize: 15000,
      },
      {
        symbol: "rainbow",
        winPrize: 10000,
        bigWinPrize: 200000,
      },
      {
        symbol: "gold",
        winPrize: 5000,
        bigWinPrize: 70000,
      },
      {
        symbol: "silver",
        winPrize: 2000,
        bigWinPrize: 40000,
      },
      {
        symbol: "violet",
        winPrize: 700,
        bigWinPrize: 12000,
      },
    ];
  }

  getPossibleSymbols() {
    const combinations = this.winCombinations();
    const symbols: string[] = [];
    for (let i = 0; i < combinations.length; i++) {
      const symbol = combinations[i].symbol;
      symbols.push(symbol);
    }
    return symbols;
  }
}

const balanceService = new BalanceService();
export default balanceService;
