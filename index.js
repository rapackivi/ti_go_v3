const express = require('express')
const app = express()

app.get('/', (req, res)=> {
  res.status(200).json({message: 'ok'})
})

app.listen(process.env.PORT || 3000, ()=> console.log('server started!'))

