const express = require('express'),
  mustacheExpress = require('mustache-express'),
  bodyParser = require('body-parser'),
  sequelize = require('sequelize'),
  models = require("./models");

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache')

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
  res.render("index");
})

app.get('/snippets', function(req, res) {
  console.log('you hit snippets');
  models.snip.findAll()
    .then(function(snipslist) {
      res.render('snippetsgui', {
        snipslist: snipslist
      })
    })
})

app.get('/newCode', function(req, res) {
  res.render("new_codesnip")
})

app.post('/createSnip_form', function(req, res) {

  const snipToCreate = models.snip.build({
    title: req.body.Title,
    body: req.body.Body,
    notes: req.body.Notes,
    language: req.body.Language,
    tags: req.body.Tags
  })
  snipToCreate.save().then(function() {
    res.redirect('/snippets')
  })
})


app.post('/delete_snip/:idOfTheSnip', function(req, res) {
  models.snip.destroy({
    where: {
      id: req.params.idOfTheSnip
    }
  }).then(function() {
    res.redirect('/snippets')
  })
})

// models.snip.findOne().then(function(snip) {
//   // console.log(snip);
// })


app.get('/update_snip/:id', function(req, res) {
  //get the snip for the id and pass that snip to the form
  models.snip.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(user) {
    console.log("poooooooooo",user);
    res.render('updatefrom', {
      user: user
    })
  })
})

app.post('/updatesnip_form/:id', function(req, res) {


  const snipToUpdate = models.snip.update({
    title: req.body.Title,
    body: req.body.Body,
    notes: req.body.Notes,
    language: req.body.Language,
    tags: req.body.Tags
    },
    {
    where: {
      id: req.params.id
    }
  }).then(function(){
    res.redirect('/snippetsgui')
  })


})



app.listen(3000, function() {
  console.log('Express running on http://localhost:3000/.')
});

process.on('SIGINT', function() {
  console.log("\nshutting down");
  const index = require('./models/index')
  index.sequelize.close()

  // give it a second
  setTimeout(function() {
    console.log('process exit');
    process.exit(0);
  }, 1000)
});
