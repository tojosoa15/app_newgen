const express           = require('express');
const router            = express.Router();
const claimController   = require('../controllers/claimController');

// Session utilisateur
router.get('/claims', claimController.getAllClaims);

module.exports= router;