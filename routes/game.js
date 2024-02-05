var express = require('express');
var router = express.Router();
var gameService = require('../services/gameService');

/* GET hello world. */
router.get('/', function(req, res, next) {
    res.send('Hello Games');
});

// Create game
router.post('/', function(req, res) {
    const newGame = gameService.createGame();
    res.json(newGame);
})

// join game
router.post('/:id/join/:playerName', async function(req, res) {
    try {
        const gameId = req.params.id;
        const playerName = req.params.playerName;
        const result = await gameService.joinGame(gameId, playerName);

        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'Game not found') {
            res.status(404).send({ message: error.message });
        } else if (error.message === 'Player name already exists in the game') {
            res.status(409).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An error occurred while joining the game' });
        }
    }

})


// get status of game
router.get('/:id', function(req, res) {
    res.json(gameService.getStatus(req.params.id));
})

module.exports = router;