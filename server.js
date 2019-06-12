var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var port = (process.env.PORT || 3000);

var mongoHost = "classmongo.engr.oregonstate.edu";
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = "cs290_whitbeyc";
var mongoPassword = "cs290_whitbeyc";
var mongoDBName = "cs290_whitbeyc";
var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;
var db = null;

var goalsData = require('./goalData');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());


app.get(['/home', '/'], function(req, res){
  res.status(200).render('home', {title: "glue"});

});

app.use(express.static('public'));

app.get('/goals', function(req, res, next) {
  // res.status(200).render('goalContainer', {
  //   title: "goals",
  //   goals: goalsData
  // });
  // console.log(goalsData);
  var collection = db.collection('goalData');
  collection.find({}).toArray(function (err, goals) {
     if (err){
         res.status(500).send({
        error: "Error fetching goals from DB"
      });
  } else {
      console.log("== goals:", goals);
      res.status(200).render('goalContainer', {
        title: "goals",
        goals: goals
    });
  }
  });

});

app.post('/goals/addGoal', function(req, res, next){
    console.log("== IN POST");
    if (req.body && req.body.goalText && req.body.goalDate){
        console.log("== IT EXISTS");
        var collection = db.collection('goalData');
        var goal = {
            goalText: req.body.goalText,
            goalDate: req.body.goalDate
        };
        console.log("== IT EXISTS");
        collection.insertOne(
                { goalText: goal.goalText},
                { goalDate: goal.goalDate},
                function (err, result) {
                    if (err) {
                        console.log("ERROR");
                        res.status(500).send({
                            error: "Error inserting goal into the database"
                        });
                    } else {
                        console.log("== update result:", result);
                        if (result.matchedCount > 0) {
                            res.status(200).send("Success");
                        } else {
                            next();
                        }
                    }
                }
        );
    } else {
        res.status(400).send("Request needs a body with a Goal and Date");
    }
});


app.get('/calendar', function(req, res, next){
  var months = ["january", "february", "march", "april",	"may", "june", "july", "august", "september", "october", "november", "december"];
  var temp = new Date();
  res.status(200).render('calendar', {title: months[temp.getMonth()]});
});

app.get('*', function(req, res, next){
  res.status(404).render('404', {title: "404"});
});


MongoClient.connect(mongoUrl, function (err, client) {
    if (err){
        throw err;
    }
    db = client.db(mongoDBName);
    app.listen(port, function() {
      console.log("== Server is listening on port", port);
    });
});
