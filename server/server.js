const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
//This sets up the server file to look at the .env file 
//located at the root of our project
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const GIPHY_KEY = process.env.GIPHY_API_KEY;


/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.get('/trending', (req, res) => {
    //todo go to giphy, get trending stuff, send to client
    axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_KEY}`)
        .then( response => {
            console.log('data from giphy', response.data);
            res.send(response.data)
        })
        .catch (error => {
            console.log('error getting trending from giphy', error);
            res.sendStatus(500);
        })
    
})

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});