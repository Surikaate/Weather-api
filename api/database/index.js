//const db = require('./database');
import db from './../database/database.js'
// pour permettre la communication entre le front et le back en dev.
//const cors = require('cors');
import cors from 'cors';

// a ajouter pour la communication entre le front et le back en dev lorsque express est instancié
/*app.use(cors({
  credentials: true
}));*/

// Initialisation de la base avec les deux tables nécessaires (à garder)
db.init();
// exemple de requete sql à supprimer
// db.all('select * from city').then((rows) => {
//   console.table(rows);
// });

// dans le cas où le front est fait en js natif, voici une ligne de commande à ajouter pour servir le front à partir du projet node
// si vous faîtes du VueJS ou du React ce n'est pas nécessaire
// dans ce cas il n'est pas nécessaire d'utiliser la partie cors (ligne 6 à 8)
//app.use('/', express.static('../../front/'));

export default db;