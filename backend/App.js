const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const app         = express();
// Port d'écoute
const port        = process.env.PORT || 3000;
const {connectDB} = require('./config/dbConfig');
const newgenRoutes = require('./routes/ipsClaims');

require('dotenv').config();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes de base
app.get('/', (req, res) => {
  res.send('API de gestion des claims en cours');
});

app.use('/api', newgenRoutes);

// Connexion à la base de données
connectDB()
  .then(() => {
    // Lancer le serveur seulement si la connexion est réussie
    app.listen(port, () => {
      console.log(`Serveur démarré sur http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Impossible de démarrer le serveur à cause de la connexion DB.");
    process.exit(1); // Quitte l'application si la base de données est inaccessible
  });