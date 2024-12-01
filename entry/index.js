const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());


app.get('/', async (req, res) => {
    let user = req.body.user

    let event = {
        type : 'LockIt',
        data : {
            user,
            time : Date.now() + 60*1000
        }
    }
    
    await axios.post('http://localhost:3008/events', event)

    console.log('inside file server');
    res.status(200).json({status : 'all good', user});
})



app.listen(3007, () => {
    console.log('file on port : 3007');
})
