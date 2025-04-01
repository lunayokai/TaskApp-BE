const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const app = express();
require('dotenv').config();

const adminName = process.env.ADMIN_NAME
const urlBase = process.env.URL_BASE

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


apiUsersRouter = require('./routes/api/users')
apiTasksRouter = require('./routes/api/tasks')

app.get('/', (req, res) => {

  res.render("index", { adminName, urlBase });
}),
app.use('/api/users', apiUsersRouter);
app.use('/api/tasks', apiTasksRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
