//Register a route that allows the user
//after login to see all their favorites
//in the favorites page

const express = require('express') 
const router = express.Router()

//Import the favorites model here:
const Favorites = require('../models/favoritesModel')

// /technews/favorites 
router.post('/', (req, res)=> {
  
  const favorites = new Favorites({
     title: req.body.title,
     description: req.body.description,
     image: req.body.image 
  })
   favorites.save()
   .then(result => {
     res.send({
       message: 'Favourites News created successfully',
       data: result
     })
   })
   .catch(error => console.log(error))
})

//EXPORT THE ROUTER
module.exports = router;