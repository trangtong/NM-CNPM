const mongoose = require('mongoose');
const validator = require('validator');
const Venue = require('./venueModel');
const mongoosePaginate = require('mongoose-paginate-v2');

const conferenceSchema = new mongoose.Schema({
 name: {
  type: String,
  trim: true,
  required: [true, `Please provide conference's name!`]
 },
 startDate: {
  type: Date,
  required: [true, `Please provide conference's start time`]
 },
 endDate: {
  type: Date,
  required: [true, `Please provide conference's end time`],
  validate: {
   validator: function (val) {
    return this.startDate < val;
   },
   message: 'End date: ({VALUE}) must larger than start date'
  }
 },
 summary: {
  type: String,
  trim: true,
  minlength: [10, `Conference's summary must have minimum 10 characters`],
  maxlength: [200, `Conference's summary must have maximum 200 characters`],
  required: [true, 'A conference must have summary description']
 },
 desciption: {
  type: String,
  trim: true,
  minlength: [50, `Conference's description must have minimum 50 characters`],
  maxlength: [
   10000,
   `Conference's desciption must have maximum 10000 characters`
  ],
  required: [true, 'A conference must have detail description']
 },
 imageCover: {
  type: String,
  required: [true, 'A conferencne must have a image to cover']
 },
 images: [String],
 address: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Venue',
  required: [true, 'A conference must hold in one address']
 },
 maxCoferenceSize: {
  type: Number,
  required: {
   validate: {
    async func(val) {
     let venue = await Venue.findById(address);
     if (!venue) return false;

     if (venue.capacity < value) return true;
     return false;
    }
   },
   message: `Max conference's size must not larger than vanue's capacity`
  }
 },
 createdDate: {
  type: Date,
  default: Date.now()
 }
});

conferenceSchema.plugin(mongoosePaginate);

conferenceSchema.pre('^find', function (next) {
 this.populate({
  path: 'address'
 });

 next();
});

const Conference = mongoose.model('Conference', userSchema);
module.exports = Conference;
