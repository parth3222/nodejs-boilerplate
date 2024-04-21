const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const userRoutes = require("./route/user")

const app = express()
app.use(cors())
app.use(express.json());
const port = 8080

app.use('/users', userRoutes);

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('MongoDB connected--------'))
    .catch(err => console.error('MongoDB connection error:121211', err));


app.listen(port, () => {    
    console.log(`sucessfully run on ${port}`)
})