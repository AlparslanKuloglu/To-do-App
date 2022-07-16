const mysql = require('mysql')
const Sequelize = require('sequelize')
const sequelize = require('../app')
const User = require('../models/user')
const Task = require('../models/task')




class UserRepostory{


    async user(userEmail){ 
      let filter= {email:userEmail}
      const user = await User.findOne({ where:filter})
     return user.dataValues
  
    }

    async allTasks(userEmail,page){ 
  
     
  
      const tasks = await Task.findAll({
        where: {
          userEmail:userEmail
        },
        order: [["createdAt", "DESC"]],
        limit:5,
        offset:( (page-1) * 5 ) 
      }) 
      return tasks
    }

    async searchTasks(search) {
        const tasks = await Task.findAll({
            where: {
              task:search
            },
            order: [["createdAt", "DESC"]]
          }) 
          return tasks

    }
  

  
  }

  module.exports = UserRepostory