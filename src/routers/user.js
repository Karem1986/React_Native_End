//Route that get users information -GET request
const express = require('express') 
const router = express.Router()
const verifyToken = require('./verifyToken')

//Import user model:
const userModel = require('../models/userModel');
router.get('/', verifyToken, (req, res)=> {
 res.send({success: true, user: req.user})
})

//EXPORT THE ROUTER
module.exports = router;