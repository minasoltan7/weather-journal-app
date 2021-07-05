// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
const cors = require("cors")
app.use(cors())





//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));



// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log(`running on port ${port}`);
})


// Integrating OpenWeatherMap API



// Our routes

// adding GET route
app.get("/weathertoday", (req, res) => {
    res.send(projectData);
})

// adding POST route
app.post("/weathertoday", (req, res) => {
    projectData = [];
    const newData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse,
    }

    projectData.push(newData);
    console.log(projectData);

    res.send(projectData);
})


