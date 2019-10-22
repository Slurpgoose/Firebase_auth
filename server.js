const [db, pgb, config] = require('./config/db');
const express = require('express');
const fs = require('fs')
const path = require('path')
const ejs = require('ejs');
const session = require('express-session');
const bodyParser = require('body-parser');
var methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const app = express();
const [createUser,] = require('./query.js');

const jsonParser = express.bodyParser
//console.log(pgb)

const pgSession = require('connect-pg-simple')(session);
console.log(config)

 app.use(session({
    
    secret: 'My Secret',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 days
}));
  

app.use(express.static(path.join(__dirname, "/public/")));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));



  app.get("/", (req, res, next) => {
    res.redirect("/home");
  });

  
  app.get("/home", (req, res, next) => {
    if (req.session.userId){
        res.redirect('/dashboard')
    }
    else{
    res.render("home");
    }
});
  
  app.get("/login", (req, res, next) => {
    res.render("logIn", { error_message: "" });
  });

  app.get("/signup", (req, res) => {
    res.render("signup", { error: "" }); // this allows the request to be sent back to the user
  });


app.post("/signup", (req, res, next) => {
console.log(req.body)
let data = JSON.parse(req.body)
var email = req.body.email;
var password = req.body.password;
var hash = CreatePasswordHash(password)
let response = createUser(db, email, hash)
return res.send(response)
});


function CreatePasswordHash(password){
    let phash = '';
    bcrypt.hash(password, 10, (err, hash) => {
        phash = hash;
    });
    return phash
}



app.post("/login", (req, res, next) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    db.users.findOne({ where: { email: email } }).then(user => {
      if (user === null) {
        res.render("login", {
          error_message: "Please check your username & password"
        });
      } else {
        bcrypt.compare(password, user.passwordHash, function (err, matched) {
          if (matched) {
            req.session.userId = user.id;
            const { id, name, email, photo_url } = user;
            res.render("userprofile", {
              id: id,
              name: name,
              email: email,
              photo: photo_url
            });
          } else {
            res.render("login", {
              error_message: "Please check your username & password"
            });
          }
        });
      }
    });
  });

app.listen(process.env.PORT || 3000, function () {
console.log("Server running on port 3000");
});