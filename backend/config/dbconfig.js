const sql = require('mssql');
require("dotenv").config();

const config = {
    server: process.env.SERVER, 
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    options: {
        enableArithAbort: true, 
        trustServerCertificate: true
    }
}; 

// Fonction pour initialiser la connexion
const connectDB = async () => {
    try {
      const pool = await sql.connect(config); // Se connecter à la base de données
      console.log("Connection OK");
      return pool; // Retourne le pool de connexion si nécessaire
    } catch (err) {
      console.error("Connection KO :", err.message); // Affiche l'erreur si la connexion échoue
      throw err; // Relance l'erreur pour que l'appelant puisse la traiter
    }
  };
  
  // Exporte l'objet SQL et la fonction de connexion
  module.exports = {
    connectDB,
    sql,
  };