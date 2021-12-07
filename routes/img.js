var express = require('express');
var router = express.Router();

const {Hotel} = require("../models/hotels");

const {authUser} = require("../private/auth");



  router.get('/:catid/:boxid/:type', function(req, res, next) { // Displays images on node app

    Hotel.findOne({_id: req.user.company}, function (err, hotel) {

      console.log("REQ");

      // BUG: CRASH IF NO IMG


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
