class PrivateGameInfo {
    constructor(publicGameInfo) {
        this.moveQueue = [];
        this.publicGameInfo = publicGameInfo
        this.privatePlayerInfo = []
    }


    queueMove(playerName, moveType, targetName) {
        const existingMoveIndex = this.moveQueue.findIndex(move => move.playerName === playerName);

        const move = {
            playerName,
            moveType,
            targetName
        };

        if (existingMoveIndex !== -1) {
            this.moveQueue[existingMoveIndex] = move;
        } else {
            this.moveQueue.push(move);
        }

        if (this.moveQueue.length === this.publicGameInfo.liveCount) {
            this.executeMoves();
        }
    }

    executeMoves() {

        const playerStrengths = new Map();

        this.publicGameInfo.players.forEach(player => {
            playerStrengths.set(player.name, 1); // Default strength of 1
        });

        this.moveQueue.forEach(move => {
            if (move.moveType === 'support') {
                const currentStrength = playerStrengths.get(move.targetName);
                playerStrengths.set(move.targetName, currentStrength + 1);
            }
        });

        this.moveQueue.forEach(move => {
            if (move.moveType === 'attack') {
                const attackerStrength = playerStrengths.get(move.playerName);
                const targetStrength = playerStrengths.get(move.targetName);

                const difference = attackerStrength - targetStrength

                if (difference > 0) {
                    this.publicGameInfo.loseHealth(targetName, difference)
                } else {
                    this.publicGameInfo.loseHealth(targetName, -difference)
                }

            }
        });

        this.moveQueue = [];
    }

}