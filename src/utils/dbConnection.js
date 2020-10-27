const mongoose = require('mongoose');

//mongodb+srv://papakarem810:<password>@cluster0.6psu4.mongodb.net/Cluster0?retryWrites=true&w=majority --> TO CONNECT TO MONGO DB
const conectionString = `mongodb+srv://${process.env.DB_HOST}/${process.env.DB_NAME}`;
console.log("=============",conectionString)
const connection = mongoose.connect(conectionString, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  // useNewUrlParser: true, //as advised on the Error 
  //  useUnifiedTopology: true //as advised on the Error 
});

module.exports = { connection }; 
