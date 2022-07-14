const express = require('express')
const pageController = require('../controllers/pageController')
const router = express.Router()
const authController=require('../controllers/authController')


router.route('/toDos').get(authController.getIndexPage)
router.route('/').get(pageController.getRegisterPage)
router.route('/login').get(pageController.getLoginPage)




module.exports= router 