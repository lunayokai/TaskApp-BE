const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const app = express();
require('dotenv').config();

const apiUsersRouter = require('./routes/api/users')
const apiListsRouter = require('./routes/api/lists')
const apiTasksRouter = require('./routes/api/tasks')

const adminName = process.env.ADMIN_NAME
const urlBase = process.env.URL_BASE

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'..', 'public')));

app.use('/api/users', apiUsersRouter);
app.use('/api/lists', apiListsRouter);
app.use('/api/tasks', apiTasksRouter);

app.get('/', (req, res) => {
  res.render("index", { adminName, urlBase });
})

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
