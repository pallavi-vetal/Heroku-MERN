const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors')
const users = require('./models/Users');
const RestoAdds = require("./models/RestaurantAddress");
const resto = require("./models/Restaurants");
const Users = require("./api/routes/Users"); 
const Resto = require("./api/routes/Restaurants");
const path = require("path")
const app = express();
//
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended:false    //Using querystring library for json parsing
}))

app.use(bodyParser.json()); //Parsing JSON data in database
const db = require('./config/keys').mongoURL;
mongoose.connect(
    db,
    {useNewUrlParser:true}
).then(()=>console.log("Successfully connected to database!"))
.catch(er => console.log(er));
app.use(express.static(path.join(__dirname, "client", "build")))
app.use(passport.initialize());   //Using for authentication
require('./config/passport')(passport)
app.use("/api/users",Users);
app.use("/api/restaurants",Resto);
const port = process.env.PORT || 8000 ;

app.listen(port, () => console.log('Listening on Port',port));