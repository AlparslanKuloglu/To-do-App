const express = require('express')
const session = require('express-session');
const app = express()
const ejs = require('ejs')
const mysql = require('mysql')
const Sequelize = require('sequelize')
const authController=require('./controllers/authController')
const pageRoute= require('./routes/pageRoute')
const userRoute= require('./routes/userRoute')
const fs = require('fs')
const path=require('path')






  
 



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
app.use('/ekle',authController.addTask)
app.use('/users/login',authController.loginUser)
app.use('/fail',authController.failTask)
app.use('/succes',authController.succesTask)

const port = 3000

app.listen(port, () => {
  console.log('Sunucu port 3000de başlatıldı')

})








