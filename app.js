const express = require('express')
const session = require('express-session');
const app = express()
const ejs = require('ejs')
const mysql = require('mysql')
const Sequelize = require('sequelize')
const authController=require('./controllers/authController')
const pageRoute= require('./routes/pageRoute')
const userRoute= require('./routes/userRoute')
const tokenAuth = require('./middlewares/tokenAuth')
const fs = require('fs')
const path=require('path');
const { findUser } = require('./test');


const MySQLStore = require('express-mysql-session')(session);



const options = {                 // setting connection options
  host: 'localhost',
  user: 'root',
  password: '12101210Sie',
  database: 'deneme',
};

const sessionStore = new MySQLStore(options);

app.use(
  session({
      secret: 'cookie_secret',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,      // assigning sessionStore to the session
  })
);



  
 



/*let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12101210Sie',
  database: 'deneme'
}); */

//connection.connect(function (err) { })

app.set("view engine", "ejs")

//Middlewares

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())





app.use('/',pageRoute )
app.use('/users',userRoute )
app.use('/ekle',tokenAuth, authController.addTask)
app.use('/users/login',authController.loginUser)
app.use('/fail',authController.failTask)
app.use('/succes',authController.succesTask)
app.use('/duzenle',authController.düzenleTask)

const port = 3000

app.listen(port, () => {
  console.log('Sunucu port 3000de başlatıldı')

})









