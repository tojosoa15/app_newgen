const { connectDB, sql } = require("../config/dbConfig");

// Fonction pour récupérer tous les utilisateurs
const getAllClaims = async () => {
  try {
    const sql       = "SELECT * FROM claims";
    // Connexion à la base de données
    const pool      = await connectDB(); 
    // Exécution de la requête SQL
    const result    = await pool.request().query(sql); 

    // Retourne les résultats
    return result.recordset; 
  } catch (error) {
    throw new Error("Erreur lors de la récupération des utilisateurs");
  }
};

module.exports = {
    getAllClaims
};