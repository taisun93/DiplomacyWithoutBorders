export interface GameState {
  players: Player[];
  currentTurn: number;
  started: boolean;
  finished: boolean;
  gameId: number;
}

function createStartingGamestate(id):GameState{
    return {
        players: [],
        currentTurn: 0,
        started: false,
        finished:false,
        gameId : id,
    }
}

export interface Player {
  id: number;
  name: string;
  health: number;
  coins: Coin[];
  action: Action;
  tradeOffers: TradeOffer[];
}

export interface Coin {
  playerId: number; // The ID of the player whose coins these are
  amount: number;
}

export interface Action {
  type: ActionType;
  targetId: number;
}

export enum ActionType {
  Support = "support",
  Battle = "battle",
}

export interface TradeOffer {
  fromPlayerId: number;
  toPlayerId: number;
  offeredCoins: Coin[];
  requestedCoins: Coin[];
}
