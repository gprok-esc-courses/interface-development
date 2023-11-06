const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://your-username:your-password@cluster0.jnw32.mongodb.net/clinic')
const doctorSchema = new mongoose.Schema({
    name: String,
    specialty: String
}, {collection: 'doctors'})
const Doctor = mongoose.model('Doctor', doctorSchema)

app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>");
})

app.get('/about', (req, res) => {
    res.send("<h1>About us</h1><p>A sample API server</p>");
})


app.get('/api/test', (req, res) => {
    res.json({'page': 'test', 'purpose': 'to test json API creation'})
})

app.get('/api/doctors', async (req, res) => {
    const doctors = await Doctor.find({}).exec();
    res.json(doctors)
})

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    await Doctor.create({
        name: req.body.name,
        specialty: req.body.specialty

    })
    res.json({'result': 'ok'})
})


app.listen(5005, () => {
    console.log("Server started on port 5005");
})