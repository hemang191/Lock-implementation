const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());


app.post('/events', (req, res) => {
    let event = req.body
    console.log(event);
    res.send({status : 'OK'});
    
})


app.listen(3008, () => {
    console.log('event-bus on port : 3008');
})