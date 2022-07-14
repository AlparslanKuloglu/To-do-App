const mysql = require('mysql')
const Sequelize = require('sequelize')
const sequelize = require('../app')
const User = require('../models/user')
const Task = require('../models/task')



exports.getIndexPage=  async (req,res)=> {


    console.log(req.session.email)
   
    const tasks = await Task.findAll({
        where: {
          userEmail: req.session.email
        }
      })
      console.log(req.session.email)
  

      const page = req.query.page || 1;          
      const photosPerPage = 5;    
      const totalPhotos = await Task.findAndCountAll({where:{ userEmail: req.session.email}})
    console.log(totalPhotos.count)
    
    const a = await Task.findAll({
      order: [["id", "DESC"]],
      limit: ( (page-1) * photosPerPage), 
      offset:(photosPerPage)
    })







    res.render('index',{userINF,toDos,
        current: page,
        pages: Math.ceil(totalPhotos / photosPerPage)})
}
exports.getProductsPage =(req,res)=> {
    res.status(200).render('products',products)
} 
exports.getRegisterPage =(req,res)=> {
    res.status(200).render('register')
} 

exports.getLoginPage =(req,res)=> {
    res.status(200).render('login')
} 


