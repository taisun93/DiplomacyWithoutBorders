const jwt = require('jsonwebtoken');

class GameService {
    constructor() {
        this.games = []; // This will temporarily store games in memory
        this.nextId = 0; // Incremental ID for each game created
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

        if (this.games[id].players.includes(playerName)) {
            throw new Error('Player name already exists in the game');
        }

        const token = jwt.sign({ playerName, gameId: id }, process.env.JWT_SECRET);

        this.games[id].players.push(playerName);
        return { success: true, game: this.games[id], token };

    }

    getStatus(id) {
        return this.games[id]
    }


}

module.exports = new GameService(); // Export as a singleton