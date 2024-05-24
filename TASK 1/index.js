const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const routes = require('./api/routes');
const errorHandler = require("./middlewares/errorHandler");
const ExpressError = require("./utils/ExpressError");
require('dotenv').config();


const app = express();
app.use(bodyParser.json());

app.use('/api', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page not found!"));
})

app.use((err,req,res,next)=>{
  let {statusCode=500, message="Somthing Went Wrong"} = err;
  res.status(statusCode).send(message);
})
