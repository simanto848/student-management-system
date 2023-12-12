// import Modules
const express = require("express");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const logger = require("morgan");
const ejs = require("ejs");
const flash = require("connect-flash")
const moment = require("moment");
app = express();
require("dotenv").config();
const routes = require("./routes/index");

// Express Session
app.use(expressSession({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// Moment
app.use((req, res, next)=>{
    res.locals.moment = moment;
    next();
});

// Static Files
app.set("view engine", "ejs");
app.use(express.static("public"));
// app.set('view engine', 'hbs');
// hbs.registerPartials(__dirname + "/views/partials", function(err){});
// hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((logger('dev')));
app.use(fileUpload());
app.use(flash());
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});


// Routes
app.use("/", routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})