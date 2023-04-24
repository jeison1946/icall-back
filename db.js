const db = require('mongoose');
db.Promise = global.Promise;

async function database(url) {
  db.set("strictQuery", false);
  await db.connect(url, {
    useNewUrlParser: true,
  });
  console.log('[db] Conectada con éxito');
}

module.exports = database;
