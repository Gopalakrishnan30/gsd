const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dbConfig = require('./app/config/db.config');
const pgDbConfig = require('./app/config/pgdb.config');


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.MONGO_URL, {
    useNewUrlParser: true,

}).then(() => {
    console.log("Mongo DB Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


// var corsOptions = {
//   origin: "http://localhost:8000"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

// health api check 
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "App is Running",
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//register routes
require("./app/routes/tutorial.routes")(app);
require("./app/routes/redisCache.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/jwtUser.routes")(app);
require("./app/routes/pgUser.routes")(app);
require("./app/routes/bank.routes")(app);


module.exports = app;
