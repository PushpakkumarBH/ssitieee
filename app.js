const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs' );
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://pushpak696:hittalkeri@cluster1.mictlsi.mongodb.net/?retryWrites=true&w=majority/IeeeDB");
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

app.get('/ieeeregister', function(req, res){
    res.render('ieeeregister');
});



app.post("/ieeeregister", function(req, res){
    const newParticipant = new Participant({
        name: req.body.name,
        institutename: req.body.institutename,
        contact: req.body.contactnum,
        email: req.body.email,
        event: req.body.event

    });
    newParticipant.save(function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.listen(process.env.PORT || 3000,function(){
    console.log('Server is running at port 3000');
});