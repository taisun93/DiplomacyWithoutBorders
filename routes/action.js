const express = require('express');
const router = express.Router();
const gameService = require('../services/gameService');

// // Endpoint to support another player
// router.post('/game/:id/support', function(req, res) {
//     const gameId = req.params.id;
//     const { supporter, recipient } = req.body;

//     try {
//         // Call the game service to perform the support action
//         const supportResult = gameService.supportPlayer(gameId, supporter, recipient);
//         res.status(200).json(supportResult);
//     } catch (error) {
//         // Handle errors appropriately
//         res.status(500).json({ message: error.message });
//     }
// });

// // Endpoint to attack another player
// router.post('/game/:id/attack', function(req, res) {
//     const gameId = req.params.id;
//     const { attacker, target } = req.body;
//     try {
//         // Call the game service to perform the attack action
//         const attackResult = gameService.attackPlayer(gameId, attacker, target);
//         res.status(200).json(attackResult);
//     } catch (error) {
//         // Handle errors appropriately
//         res.status(500).json({ message: error.message });
//     }
// });

module.exports = router;