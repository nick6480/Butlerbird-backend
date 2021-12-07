const mongoose = require('mongoose');
const HotelSchema  = new mongoose.Schema({
  hotel :{
      type  : String,
      required : true
  } ,
  address :{
      type : String,
      required : true,
  } ,
  city :{
    type : String,
    required : true
} ,
country :{
    type : String,
    required : true
} ,
paymentPlan :{
    type : String,
},
butlerbird : {
    url: { type : String, unique : true},
    content : {
      categorys : [{
        category: {
          catid: String,
          name : String,
          content : [{
            name : String,
            preview : {
              text : String,
              img : {
                data : Buffer,
                contentType : String
              },
              action : String,
            },
            page: {
              text : String,
              img : {
                data : Buffer,
                contentType : String
              }
            }
          }]
        }
      }]
    },
    style : {

    },
    defaultsettings: {
      accessiblity: {
        language: {
          type: String,
          default: 'English',
      },
        fontsize: {
          type: String,
          default: 'Normal',
      },
      },
      design: {
        theme: {
          type: String,
          default: 'Light',
      },
      },
      weather: {
        widget: {
          type: Boolean,
          default: true,
        },
        unit: {
          type: String,
          default: 'metric',
        }
      }
    }
},

}, {timestamps: true});
const Hotel = mongoose.model('hotel',HotelSchema);

module.exports = {
  Hotel
}
