require('dotenv').config();

const app = require('./app');
const { initializeDatabase } = require('../src/database/initialDatabase');

const port = process.env.PORT
const urlBase = process.env.BASE_URL
const DevName = process.env.DEV_NAME




async function dotEnvConnection() {
    adminName ?
     console.log(`${DevName} esta desarrollando esta aplicacion`) :
      console.log("Nadie esta manejando esta aplicacion y probablemente haya errores.")
}

async function main() {
    try {
        dotEnvConnection()      
        initializeDatabase()
        app.listen(port)
        console.log(`Servidor Express corriendo en ${urlBase}`);
    } catch (error) {
        console.error(`Hubo problemas al intentar iniciar ${urlBase}`)
    }
}

main()