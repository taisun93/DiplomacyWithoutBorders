class PublicGameInfo {
    constructor() {
        this.id = ''; // Unique identifier for the game
        this.players = []; // Array of player objects with public info
        this.gameStarted = false
    }

    addPlayer(playerName) {
        const playerInfo = new PublicPlayerInfo(playerName);
        this.players.push(playerInfo);
    }

}

class PublicPlayerInfo {
    constructor(name) {
        this.name = name;
        this.health = 10;
    }

}