


var express = require('express');
var exphbs = require('express-handlebars');
var app = express();

var port = (process.env.PORT || 3000);

var goalsData = require('./goalData');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get(['/home', '/'], function(req, res){
  console.log('check get');
  res.status(200).render('home', {title: "glue"});

});

app.use(express.static('public'));

app.get('/goals', function(req, res) {
  res.status(200).render('goalContainer', {
    title: "goals",
    goals: goalsData
  });
  console.log(goalsData);
});


app.get('/calendar', function(req, res){

  res.status(200).render('calendar', {title: "calendar"});

});

app.get('/to-do', function(req, res){

  res.status(200).render('to-do', {title: "to-do"});

});

app.listen(port, function() {
  console.log("== Server is listening on port", port);
});
