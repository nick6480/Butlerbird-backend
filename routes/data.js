var express = require('express');
var router = express.Router();


const {Hotel} = require("../models/hotels");


// Display data on Butlerbird


router.get('/company/get', function(req, res, next) { // GET Company data
  Hotel.findOne({'butlerbird.url' : req.hostname}, function (err, hotel) {
    if(err) console.log(err);
    if(hotel) {

        let obj = {
          name: hotel.hotel,
          address: hotel.address,
          city: hotel.city,
          country: hotel.country
        }

      res.json(obj);
    }
  })


  res.status(200)
});



router.get('/settings/get', function(req, res, next) {// Get the default settings

  Hotel.findOne({'butlerbird.url' : req.hostname}, function (err, hotel) {
    if(err) console.log(err);
    if(hotel) {

      console.log(hotel.defaultsettings);

      res.json(hotel.defaultsettings);
    }
  })


  res.status(200)
});



router.get('/img/:catid/:boxid/:type', function(req, res, next) {

    Hotel.findOne({'butlerbird.url' : req.hostname}, function (err, hotel) {

    console.log("REQ");




    if(err) console.log(err);
    if(hotel) {

      for (var i = 0; i < hotel.butlerbird.content.categorys.length; i++) {
        if (hotel.butlerbird.content.categorys[i].category.catid == req.params.catid) {
          for (var o = 0; o < hotel.butlerbird.content.categorys[i].category.content.length; o++) {
            if (hotel.butlerbird.content.categorys[i].category.content[o]._id == req.params.boxid) {
              if (req.params.type == 'preview') {
                if (hotel.butlerbird.content.categorys[i].category.content[o].preview.img) {
                  res.contentType(hotel.butlerbird.content.categorys[i].category.content[o].preview.img.contentType);
                  res.send(hotel.butlerbird.content.categorys[i].category.content[o].preview.img.data);
                }
              } else if (req.params.type == 'page') {
                  if (hotel.butlerbird.content.categorys[i].category.content[o].page.img) {
                    res.contentType(hotel.butlerbird.content.categorys[i].category.content[o].page.img.contentType);
                    res.send(hotel.butlerbird.content.categorys[i].category.content[o].page.img.data);
                  }

              }


            }
          }
        }
      }

    }
  })
})















module.exports = router;
