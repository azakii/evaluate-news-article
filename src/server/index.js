var path = require('path');
const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors');
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();
const API_KEY = process.env.API_KEY;
const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?key=";

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))
app.get('/', function(req, res) {
    res.sendFile('dist')
})

app.post('/api', async function(request, response) {
    const data = await fetch(baseUrl + API_KEY + "&lang=auto&url=" + request.body.url);
    try {
        const ApiData = await data.json();
        response.send(ApiData)
    } catch (error) {
        console.log("error", error);
    }
});


// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})