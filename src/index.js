require('dotenv').config();

const app = require('./app');
const { initializeDatabase } = require('../src/database/initialDatabase');

const port = process.env.PORT
const urlBase = process.env.URL_BASE
const DevName = process.env.DEV_NAME

const resetDataBase = false;

async function dotEnvConnection() {
    DevName ?
        console.log(`${DevName} esta desarrollando esta aplicacion`) :
        console.log("Nadie esta manejando esta aplicacion y probablemente haya errores.")
}

async function main() {
    try {
        dotEnvConnection()
        if (resetDataBase) {
            initializeDatabase()
        }
        app.listen(port)
        console.log(`Servidor Express corriendo en ${urlBase}`);
    } catch (error) {
        console.error(`Hubo problemas al intentar iniciar ${urlBase}`)
    }
}

main()