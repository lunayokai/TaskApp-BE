const createAdminsTable  = require('./models/adminsModel');
const {createUsersTable} = require('./models/usersModel')
const {createListsTable} = require('./models/listsModel');
const {createTasksTable} = require('./models/tasksModel');
const seedAdmin = require('./seeders/adminSeed');
const seedUser = require('./seeders/userSeed');
const seedList = require('./seeders/ListSeed');
const seedTask = require('./seeders/taskSeed');

const pool = require('./config/connection');


const initializeDatabase = async () => {
   try { 
      await pool.query('DROP TABLE IF EXISTS tasks');
      console.log('Tabla "tasks" eliminada.');
      await pool.query('DROP TABLE IF EXISTS lists');
      console.log('Tabla "lists" eliminada.');
      await pool.query('DROP TABLE IF EXISTS users');
      console.log('Tabla "users" eliminada.');
      await pool.query('DROP TABLE IF EXISTS admins');
      console.log('Tabla "admins" eliminada.');
      await createAdminsTable(); 
      console.log('Tabla "admins" verificada o creada exitosamente.');
      await createUsersTable();  
      console.log('Tabla "users" verificada o creada exitosamente.');
      await createListsTable();
      console.log('Tabla "tasks" verificada o creada exitosamente.');
      await createTasksTable();
      console.log('Tabla "lists" verificada o creada exitosamente.');

      await seedAdmin(); 
      await seedUser(); 
      await seedList(); 
      await seedTask();    
     

    
     } catch (error) {
  console.error('Error al inicializar la base de datos:', error); 
} };

module.exports = {initializeDatabase};