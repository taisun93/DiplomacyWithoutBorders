class PublicGameInfo {
    constructor() {
        this.id = '';
        this.players = [];
        this.gameStarted = false
        this.liveCount = 0
    }

    addPlayer(playerName) {
        const playerInfo = new PublicPlayerInfo(playerName);
        this.players.push(playerInfo);
    }

    loseHealth(playerName, damage) {

        const player = this.players.find(p => p.name === playerName);
        player.health -= damage;
        if (player.health <= 0) {
            this.liveCount--
        }
    }

}

class PublicPlayerInfo {
    constructor(name) {
        this.name = name;
        this.health = 10;
    }

}