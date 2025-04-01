const createAdminsTable = require('../database/models/adminsModel');
const {createUsersTable} = require('../database/models/usersModel')
const {createListsTable} = require('../database/models/listsModel');
const {createTasksTable} = require('../database/models/tasksModel');
const seedAdmin = require('../database/seeders/adminSeed');
const seedUser = require('../database/seeders/userSeed');
const seedList = require('../database/seeders/listSeed');
const seedTask = require('../database/seeders/taskSeed');

const initializeDatabase = async () => {
   try {
     await createAdminsTable(); 
     await createUsersTable();  
     await createListsTable();
     await createTasksTable();

     await seedAdmin(); 
     await seedUser(); 
     await seedList(); 
     await seedTask(); 

     
     } catch (error) {
  console.error('Error al inicializar la base de datos:', error); 
} };

module.exports = {initializeDatabase};