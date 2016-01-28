var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./../models');
var Photo = db.Photo;


router.use(bodyParser.urlencoded({ extended : true }));

router.get('/new', function(req, res) {
  res.render('photos/new');
});

router.get('/:id', function(req, res) {
  Photo.findById(req.params.id)
    .then(function (photo) {
      res.json(photo);
    });
});


router.post('/', function (req, res) {
  Photo.create({
    title : req.body.title,
    link : req.body.link,
    description : req.body.description })
    .then(function (photo) {
      res.json(photo);
    });
});

router.get('/:id/edit', function(req, res){
  Photo.findById(req.params.id)
  .then(function(data){
    res.render('photos/edit', {
      photo : data
    });
  });
});

router.put('/:id', function(req, res){
  console.log('in put');
  Photo.update(
  {
    updatedAt : 'now()',
    title : req.body.title,
    description : req.body.description,
    link : req.body.link
  }, {
    where : {
      id : req.params.id
    }
  })
  .then(function(){
    res.redirect('/gallery/' + req.params.id);
  });
});

module.exports = router;