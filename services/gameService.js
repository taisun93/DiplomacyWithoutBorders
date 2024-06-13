const jwt = require('jsonwebtoken');
import * as gamestate from gamestate.ts
import { ErrorMessage } from '../models/errorMessage';

class GameService {
    constructor() {
        this.games = []; // This will temporarily store games in memory
        this.nextId = 0; // Incremental ID for each game created
        this.startedGames = new Map();
    }

    createGame() {
        const newGame = gamestate.createGame(this.nextId)
        this.games.push(newGame);
        this.nextId++;
        return newGame;
    }

    joinGame(id, playerName) {

        if (!this.games[id]) {
            throw new Error(ErrorMessage.gameNotFound);
        }

        if (this.games[id].players.some(player => player.name === playerName)) {
            throw new Error(ErrorMessage.dupePlayer);
        }

        const newPlayer = new PublicPlayerInfo(playerName);

        const token = jwt.sign({ playerName, gameId: id }, process.env.JWT_SECRET);

        this.games[id].players.push(newPlayer);

        return { success: true, game: this.games[id], token };
    }

    // startGame(gameId) {
    //     if (!this.games[gameId]) {
    //         throw new Error('Game not found');
    //     }

    //     const privateGameInfo = new PrivateGameInfo(this.games[gameId]);

    //     this.startedGames.set(gameId, privateGameInfo);

    //     this.games[gameId].gameStarted = true;

    //     return this.games[gameId];
    // }

    // //auth
    // attackPlayer(gameId, attackerName, targetName) {
    //     this.startedGames.get(this.games[gameId]).queueMove(attackerName, "attack", targetName)
    // }

    // //auth
    // supportPlayer(gameId, supporterName, targetName) {

    //     this.startedGames.get(this.games[gameId]).queueMove(supporterName, "support", targetName)
    // }


}

module.exports = new GameService();