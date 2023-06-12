const express = require('express');
const initWebRoutes = require('./route/web');
const bodyParser = require('body-parser')
// const connectDB = require('./config/connectDB');

let app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

initWebRoutes(app);
// connectDB(app);

let port = 8080; 

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port);
})

