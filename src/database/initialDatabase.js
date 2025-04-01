const createAdminsTable  = require('./models/adminsModel');
const {createUsersTable} = require('./models/usersModel')
const {createListsTable} = require('./models/listsModel');
const {createTasksTable} = require('./models/tasksModel');
const seedAdmin = require('./seeders/adminSeed');
const seedUser = require('./seeders/userSeed');
const seedList = require('./seeders/ListSeed');
const seedTask = require('./seeders/taskSeed');

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