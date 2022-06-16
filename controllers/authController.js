const mysql = require('mysql')
const Sequelize = require('sequelize')
const sequelize = require('../app')
const User = require('../models/user')
const Task = require('../models/task')



exports.createUser = async (req, res) => {
  let user = await User.create({
    email: req.body.email,
    password: req.body.password,
    fail:0,
    succes:0

  })

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

    const toDos = await Task.findAll({
      where: {
        userEmail: user.dataValues.email
      }
    })

    let userINF = user.dataValues
    let pass = user.password
    let enteringPass = req.body.password

    if (pass === enteringPass) { res.render('index', { userINF,toDos }) }





  } catch (error) {
    prompt("Kullanıcı adı veya şifre hatalı")
    await res.render('register')
  }
};





exports.addTask = async (req, res) => {

  try {

    const user = await User.findOne({
      where: {
        email: req.body.userEmail
      }
    })


    const task = await Task.create({
      userEmail: req.body.userEmail,
      task: req.body.task,
      done: "no"
    })


 const toDos = await Task.findAll({
      where: {
        userEmail: req.body.userEmail
      }
    })

  
  let userINF=user.dataValues
    res.render('index',{userINF,toDos})

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
      id: req.body.taskUserID
    }
  })

 user.fail += await 1
 await user.save()
 
  let userINF = user.dataValues



 const toDos = await Task.findAll({
  where: {
    userEmail: user.dataValues.email
  }
})



 res.render('index',{userINF,toDos})

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
      id: req.body.taskUserID
    }
  })

 user.succes += await 1
 await user.save()
 
  let userINF = user.dataValues



 const toDos = await Task.findAll({
  where: {
    userEmail: user.dataValues.email
  }
})



 res.render('index',{userINF,toDos})






}