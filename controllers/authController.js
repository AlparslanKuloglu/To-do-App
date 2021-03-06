const mysql = require('mysql')
const Sequelize = require('sequelize')
const sequelize = require('../app')
const User = require('../models/user')
const Task = require('../models/task')
const UserRepostory = require('../repostories/userRepostory')
const jwt = require('jsonwebtoken')
require("dotenv").config();




exports.createUser = async (req, res) => {
  let user = await User.create({
    email: req.body.email,
    password: req.body.password,
    fail:0,
    succes:0

  })
  const { email, password } = req.body;

  const token = jwt.sign(
    { user_id: user._id, email },
    `${process.env.JWT_SECRET_KEY}`,
    {
      expiresIn: "2h",
    }
  );
  // save user token
  user.token = token;
  user.save()



  console.log(user)
  res.status(200).render('register')
}


exports.loginUser = async (req, res) => {

  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })

  
    req.session.email=req.body.email
    console.log(user.dataValues.email)
    console.log(req.session)

    let pass = user.password
    let enteringPass = req.body.password

  

    

    if (pass === enteringPass) {res.redirect("/toDos") }





  } catch (error) {
  
    await res.render('register')
  }
};





exports.addTask = async (req, res) => {

  try {

    const user = await User.findOne({
      where: {
        email: req.session.email
      }
    })


    const task = await Task.create({
      userEmail: req.session.email,
      task: req.body.task,
      done: "no"
    })


    
  res.redirect("/toDos")

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.failTask = async (req, res) => {
 
  const task = await Task.findOne({
    where: {
      id: req.body.taskID
    }
  })

 await task.destroy()

  const user = await User.findOne({
    where: {
     email:req.session.email
    }
  })

 user.fail += await 1
 await user.save()
 
 res.redirect("/toDos")

}



exports.succesTask = async (req, res) => {
 
  const task = await Task.findOne({
    where: {
      id: req.body.taskID
    }
  })

 await task.destroy()

  const user = await User.findOne({
    where: {
      email:req.session.email
    }
  })
 user.succes += await 1
 await user.save()
 
  
res.redirect("/toDos")



}



exports.d??zenleTask = async (req, res) => {
 
  const task = await Task.findOne({
    where: {
      id: req.body.taskID
    }
  })

task.task= await req.body.task
await task.save()
  

res.redirect("/toDos")

}





exports.getIndexPage=  async (req,res)=> {


let user= await new UserRepostory().user(req.session.email)



  const search = req.query.search;
  const page = req.query.page || 1;            
  const totalTasks = await Task.findAndCountAll({where:{ userEmail: user.email}})

  if(search) { 
   const tasks = await new UserRepostory().searchTasks(search)

  res.render('index',{user,tasks,
    current: page,
    pages: Math.ceil(totalTasks.count / 5)})

  
  
}

 
if(!search) {
  
  const tasks= await new UserRepostory().allTasks(user.email,page)



  res.render('index',{user,tasks,
    current: page,
    pages: Math.ceil(totalTasks.count / 5)})
}

}






