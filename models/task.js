const Sequelize = require('sequelize')


const sequelize = new Sequelize({
    database: 'deneme',
    username: 'root',
    password: '12101210Sie',
    dialect: 'mysql'
   })

  

   const Task = sequelize.define('task',{
    id: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     allowNull: false,
     primaryKey: true
    },
    userEmail:{type: Sequelize.STRING},
    task: {type: Sequelize.STRING},
   
}
    )


    module.exports = Task