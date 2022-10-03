const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
// const nodemailer = require('nodemailer');

const app = express();
app.set('view engine', 'ejs' );
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://pushpak696:S8H4zXQ8eq01ah1X@cluster1.mictlsi.mongodb.net/IeeeDB");

// mongoose.connect("mongodb://localhost:27017/IeeeDB", {useNewUrlParser: true, useUnifiedTopology: true});

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

// nodemailer functionality
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'bahubalish1974@gmail.com',
//         pass: 'HiTTalkeri11,',
//     }
// });

// const mailOptions = {
//     from: 'bahubalish1974@gmail.com',
//     to: 'pushpak696@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });
// config.action_mailer.smtp_settings = {
//     password: 'zlcaavhusckzwgzr',
//     authentication: 'plain',
//     enable_starttls_auto: true
//   }


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
    // const mailOptions = {
    //     from: 'bahubalish1974@gmail.com',
    //     to: newParticipant.email,
    //     subject: 'Sucessfully Registered',
    //     text: 'Thank you for registering for the event visit our website for more details about event...'
    // };
    newParticipant.save(function(err){
        if(err){
            console.log(err);
        } else {
            // transporter.sendMail(mailOptions, function(error, info){
            //     if (error) {
            //         console.log(error);
            //     } else {
            //         console.log('Email sent: ' + info.response);
        
            //     }
            // });
            res.redirect('/');
        }
    });
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Server is running at port 3000');
});
