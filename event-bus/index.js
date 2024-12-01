const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());


app.post('/events', async(req, res) => {
    let event = req.body
    console.log(event);
    
    axios.post('http://localhost:3009/events', event).catch((err) => {
        console.log(3009);
        console.log(err.message);
    })

    res.send({status : 'OK'});

})


app.listen(3008, () => {
    console.log('event-bus on port : 3008');
})