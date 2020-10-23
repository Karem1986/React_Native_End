const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY
const router = new Router();
const userModel = require('../models/userModel');
//Validation with Express vaidator:
const {check, validationResult} = require('express-validator')


const validate = [
  check('name')
    .isLength({min: 2})
    .withMessage('Your full name is required'),
  check('email')
     .isEmail()
     .withMessage('Please provide a valid email'),
  check('password')
     .isLength({min: 6})
     .withMessage('Password must be at least 6 characters')
]

const loginValidation = [
  check('email')
     .isEmail()
     .withMessage('Please provide a valid email'),
  check('password')
     .isLength({min: 6})
     .withMessage('Password must be at least 6 characters')
]

//Create a new user
router.post('/signup', validate, async (req, res) => {

  const errors = validationResult(req)
  
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Check that user does not signup with an email that already exists
  const userExist = await userModel.findOne({email: req.body.email})
  if(userExist) return res.status(400).send('Email already exists')

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })

try {
  const savedUser = await user.save()
  res.send({id: savedUser._id, name: savedUser.name, email: savedUser.email})
} catch (error) {
  return res.status(500).send({ message: 'Server error, something is wrong' });
}
});

//Login 
router.post('/login', loginValidation, async (req, res) => {
//Check if the email exists
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await userModel.findOne({email: req.body.email})
  if(!user) return res.status(404).send('User is not registered')
//Check if password is correct

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) return res.status(404).send('Invalid email or password')

  //JWT creat and assign a token 
  const token = jwt.sign({_id: user._id, email: user.email}, secretKey )
  res.header('auth-token', token).send({message: 'Logged in successfuly', token})
})

//EXPORT THE ROUTER
module.exports = router;
