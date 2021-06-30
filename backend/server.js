// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
//let mongoose = require('mongoose');
// Import Cors
let cors = require("cors");
// Initialise the app
let app = express();


// var corsOptions = {
//     origin: "http://localhost:8080"
// };

// app.use(cors(corsOptions));

app.use(bodyParser({limit: '50mb'}));
app.use(function(req, res, next) {

    // console.log('\n\nreq : ' +  JSON.stringify(req.body))
    console.log('\n\nreq.body : ' +  JSON.stringify(req.body))
    console.log('\n\nreq : ' + req)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method");
    
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
    });

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//app.use(cors());

// Setup server port
var port = process.env.PORT || 8080;


// Send message for default URL
app.get('/', (req, res) => res.send('Hello World here you\'ll find DXF on Web'));


// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});