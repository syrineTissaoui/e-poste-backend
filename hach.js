const bcrypt = require('bcrypt');

const motDePasse = 'liv569';

bcrypt.hash(motDePasse, 10).then((hash) => {
  console.log(`Mot de passe haché : ${hash}`);
}).catch((err) => {
  console.error('Erreur lors du hachage :', err);
});
