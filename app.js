const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars')
const app = express();
app.set('view engine', 'ejs' );
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
require('dotenv').config()

// mongoose.connect("mongodb+srv://pushpak696:"+ process.env.MONGODB_PWD +"@cluster1.mictlsi.mongodb.net/IeeeDB");

mongoose.connect("mongodb://localhost:27017/IeeeDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', function(req, res){
    res.render('home');
});


const participantSchema = new mongoose.Schema ({
    name: String,
    institutename: String,
    contactnum: Number,
    email: String,
    event: String
});

const Participant = mongoose.model("Participant", participantSchema);

// nodemailer code starts here
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bahubalish1974@gmail.com',
      pass: process.env.NODEM_PWD 
    }
  });
// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};
transporter.use('compile', hbs(handlebarOptions))

// nodemailer code ends here

app.get('/ieeeregister', function(req, res){
    res.render('ieeeregister');
});



app.post("/ieeeregister", function(req, res){
    const newParticipant = new Participant({
        name: req.body.name,
        institutename: req.body.institutename,
        contactnum: req.body.contactnum,
        email: req.body.email,
        event: req.body.event

    });
    var mailOptions = {
        from: 'bahubalish1974@gmail.com',
        to: req.body.email,
        subject: 'Sucessfully Registered',
        template: 'email',
        context: {
            name: req.body.name,
            institutename: req.body.institutename,
            contactnum: req.body.contactnum,
            email: req.body.email,
            event: req.body.event
        },
        attachments: [{ filename: "pic-1.jpeg", path: "./attachments/pic-1.jpeg" }]
      };
    newParticipant.save(function(err){
        if(err){
            console.log(err);
        } else {

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            res.redirect('/');
        }
    });
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Server is running at port 3000');
});
