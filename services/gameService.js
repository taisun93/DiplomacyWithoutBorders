const jwt = require('jsonwebtoken');

class GameService {
    constructor() {
        this.games = []; // This will temporarily store games in memory
        this.nextId = 0; // Incremental ID for each game created
        this.startedGames = new Map();
    }

    createGame() {
        const newGame = new PublicGameInfo(this.nextId);
        this.games.push(newGame);
        this.nextId++;
        return newGame;
    }

    joinGame(id, playerName) {

        if (!this.games[id]) {
            throw new Error('Game not found');
        }

        if (this.games[id].players.some(player => player.name === playerName)) {
            throw new Error('Player name already exists in the game');
        }

        const newPlayer = new PublicPlayerInfo(playerName);

        const token = jwt.sign({ playerName, gameId: id }, process.env.JWT_SECRET);

        this.games[id].players.push(newPlayer);

        return { success: true, game: this.games[id], token };
    }

    startGame(gameId) {
        if (!this.games[gameId]) {
            throw new Error('Game not found');
        }

        const privateGameInfo = new PrivateGameInfo(this.games[gameId]);

        this.startedGames.set(gameId, privateGameInfo);

        this.games[gameId].gameStarted = true;

        return this.games[gameId];
    }

    attackPlayer(gameId, attackerName, targetName) {

    }


}

module.exports = new GameService(); // Export as a singleton