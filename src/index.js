const app = require('./app');
require('dotenv').config();
const port = process.env.PORT
const urlBase = process.env.BASE_URL
const adminName = process.env.ADMIN_NAME



async function dotEnvConnection() {
    adminName ?
     console.log(`${adminName} esta desarrollando esta aplicacion`) :
      console.log("Nadie esta manejando esta aplicacion y probablemente haya errores.")
}

async function main() {
    try {
        app.listen(port)
        dotEnvConnection()      
        console.log(`Servidor Express corriendo en ${urlBase}`);
    } catch (error) {
        console.error(`Hubo problemas al intentar iniciar ${urlBase}`)
    }
}

main()