const express           = require('express');
const router            = express.Router();
const claimController   = require('../controllers/claimController');

// Session utilisateur
router.get('/claims', claimController.getAllClaims);
router.get('/roles', claimController.getAllRoles);
router.get('/user_by_role/:id', claimController.getUserByRole);

module.exports= router;