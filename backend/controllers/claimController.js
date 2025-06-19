const claimModel = require('../models/claimModel');
// Retourne tous les claims
exports.getAllClaims = async (req, res) => {
    try {
      // Appelle la fonction du modèle
      const users = await claimModel.getAllClaims();
      // Renvoie les claims
      res.status(200).json(users); 
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur du serveur.");
    }
};