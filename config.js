const config = {
  dbUrl: process.env.DB_URL || 'mongodb://admin:H9YXCiC1M4a3PLMm@ac-0fi5vdv-shard-00-00.vb3vwpt.mongodb.net:27017,ac-0fi5vdv-shard-00-01.vb3vwpt.mongodb.net:27017,ac-0fi5vdv-shard-00-02.vb3vwpt.mongodb.net:27017/?ssl=true&replicaSet=atlas-kailx9-shard-0&authSource=admin&retryWrites=true&w=majority',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app'
}

module.exports = config;