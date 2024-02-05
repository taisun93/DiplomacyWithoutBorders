class GameService {
    constructor() {
        this.games = []; // This will temporarily store games in memory
        this.nextId = 0; // Incremental ID for each game created
    }

    createGame() {
        const newGame = {
            id: this.nextId,
            players: [],
            status: 'waiting for players', // Initial status of the game
        };
        this.games.push(newGame);
        this.nextId++; // Prepare ID for the next game
        return newGame;
    }

    joinGame(id, playerName) {

        if (!this.games[id]) {
            throw new Error('Game not found');
        }

        if (this.games[id].players.includes(playerName)) {
            throw new Error('Player name already exists in the game');
        }

        this.games[id].players.push(playerName);
        return { success: true, game: this.games[id] };

    }

    getStatus(id) {
        return this.games[id]
    }


}

module.exports = new GameService(); // Export as a singleton