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
//cors is for get api request from frontend 
app.use(require('cors')())
//connect static
app.use('/uploads', express.static('./server/uploads'))
//add all routes
app.use("/api/auth", require('./server/routes/auth'));
app.use("/api/user", require('./server/routes/userpage'))
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/time-go', 
  passport.authenticate('google', { failureRedirect: '/api/auth/login', session: false }),
  
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api/user/userpage');
});

// app.use("/api/analytics", require('./server/routes/analytics'));
// app.use("/api/category", require('./server/routes/category'));
// app.use("/api/position", require('./server/routes/position'));
// app.use("/api/order", require('./server/routes/order'));

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