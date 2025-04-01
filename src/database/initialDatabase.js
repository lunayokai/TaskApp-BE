const createAdminsTable = require('../database/models/adminModel');
const seedAdmin = require('../database/seeders/adminSeed');

const initializeDatabase = async () => {
   try {
     await createAdminsTable(); 
     await seedAdmin(); 
     
     } catch (error) {
  console.error('Error al inicializar la base de datos:', error); 
} };

module.exports = {initializeDatabase};