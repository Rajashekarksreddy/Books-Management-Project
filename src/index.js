const mongoose = require('mongoose')
const bodyPerser = require('body-parser')
const express = require('express')
const route = require('./routes/route')


const app = express()

app.use(bodyPerser.json())
app.use(bodyPerser.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://jaganreddy-functionup:ORj2ygJHT7jbS3y8@cluster0.nduth.mongodb.net/Blog-website?retryWrites=true&w=majority', {
    useNewUrlParser:true
})

.then(console.log('mango db donnected'))
.catch(err => console.log(err))


app.use('/', route)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })