const express = require('express')

const router = express.Router()
const Product = require('../models/product')
const fileUpload = require('express-fileupload')
const app = express()
const mongoose = require('mongoose')
const ejs = require('ejs')
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(fileUpload())

router.route('/addToBasket').post(productontroller.addToBasket)
router.route('/').post(productontroller.createProduct)
router.route('/').get(productontroller.getAllProducts)
router.route('/:slug').get(productontroller.getProduct);
//router.route('/:slug').get()



module.exports= router 
