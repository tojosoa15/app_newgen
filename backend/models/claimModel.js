const { connectDB, sql } = require("../config/dbconfig");

// Fonction pour récupérer tous les claims
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
    throw new Error("Erreur lors de la récupération des claims");
  }
};

// Fonction pour récupérer tous les roles
const getAllRoles = async () => {
  try {
    const sql       = "SELECT * FROM roles";
    // Connexion à la base de données
    const pool      = await connectDB(); 
    // Exécution de la requête SQL
    const result    = await pool.request().query(sql); 

    // Retourne les résultats
    return result.recordset; 
  } catch (error) {
    throw new Error("Erreur lors de la récupération des roles");
  }
};

// Fonction pour récupérer tous les roles
const getUserByRole = async () => {
  try {
    const sql       = "SELECT * FROM users us LETF JOIN ";
    // Connexion à la base de données
    const pool      = await connectDB(); 
    // Exécution de la requête SQL
    const result    = await pool.request().query(sql); 

    // Retourne les résultats
    return result.recordset; 
  } catch (error) {
    throw new Error("Erreur lors de la récupération des roles");
  }
};

module.exports = {
    getAllClaims,
    getAllRoles,
    getUserByRole
};