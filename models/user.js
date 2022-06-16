const Sequelize = require('sequelize')


const sequelize = new Sequelize({
    database: 'deneme',
    username: 'root',
    password: '12101210Sie',
    dialect: 'mysql'
   })

const User = sequelize.define('user',{
    id: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     allowNull: false,
     primaryKey: true
    },
    succes:
    {type:Sequelize.INTEGER},
    fail:
    {type:Sequelize.INTEGER},
    email:{type: Sequelize.STRING},
    password: {type: Sequelize.STRING}
}
    )

    module.exports = User

  