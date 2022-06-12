const express = require('express')
const pageController = require('../controllers/pageController')
const router = express.Router()


router.route('/aaa').get(pageController.getIndexPage)
router.route('/').get(pageController.getRegisterPage)
router.route('/login').get(pageController.getLoginPage)




module.exports= router 