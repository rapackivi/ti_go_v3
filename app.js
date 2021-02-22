const express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path')

mongoose.connect(require('./server/config/keys').mongoURI, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true  
  }, (err) => console.log(err||"DB connect!"));
const app = express();
require('./server/middleware/passport')(passport);
//using passport for authentificate
app.use(passport.initialize());


//parsing of request body
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//logging of api requests
app.use(require('morgan')("dev"))
app.use(require('cors')())
//connect static
app.use('/uploads', express.static('uploads'))
//add all routes
app.use("/api/auth", require('./routes/auth'));
app.use("/api/analytics", require('./routes/analytics'));
app.use("/api/category", require('./routes/category'));
app.use("/api/position", require('./routes/position'));
app.use("/api/order", require('./routes/order'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'))
  app.get('*', (req, res)=>{
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'client', 'index.html'
      )
    )
  })
}
module.exports = app;