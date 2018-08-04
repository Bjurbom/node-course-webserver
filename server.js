const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app =  express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if (err){
            console.log('inable to append to server.log');
        }
    });
    next();
});
/*
app.use((req,res,next) =>{
    res.render('maintenec.hbs');
});
*/
app.use(express.static(__dirname + '/publc'));

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt' , (text) =>{
    return text.toUpperCase();
});


app.get('/', (req, res) =>{
   // res.send('<h1>Hello express!</h1>');
   res.render('index.hbs', {
    pagetitle: 'Home Page',
    wm: "boi"
});
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pagetitle: 'About Page',
    });
});


app.get('/bad' , (req, res) =>{
    res.send({
        errorMessage: 'unable to connect to server'
    });
});


app.listen(3000 ,()=>{
    console.log('the website is on port 3000');
});