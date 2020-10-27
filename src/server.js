
const {config} = require('dotenv');
const {resolve} = require('path');

const BASE_PATH = __dirname;
config({ path: resolve(`${BASE_PATH}/../.env`) });

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser')
const {connection}= require('./utils/dbConnection')
const app = express();
//Import the routes:
const authRouter = require("./routers/auth")
const favorites = require('./routers/favorites')
const users = require('./routers/user')

// PORT
const port = process.env.PORT || 4002;

// Middlewares:
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

//Register routes here
app.use("/", authRouter);
app.use("/technews/favorites", favorites)
app.use("/userprofile", users)

//Listen on the specified port: 
connection.then(() => {
  console.info("DB connected successfully");
  app.listen(port, () => {
    console.info(`Server is running on ${port} with process id ${process.pid}`);
  });
});