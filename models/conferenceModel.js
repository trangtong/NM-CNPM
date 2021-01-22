const mongoose = require('mongoose');
const validator = require('validator');
const Venue = require('./venueModel');
const mongoosePaginate = require('mongoose-paginate-v2');
const AppError = require('../ultilities/appError');
const slugify = require('slugify');

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
   validator: async function (val) {
    let conferences = await this.constructor.find({
     $or: [
      {
       $and: [
        { startDate: { $gte: this.startDate } },
        { startDate: { $lte: this.endDate } }
       ]
      },
      {
       $and: [
        { endDate: { $gte: this.startDate } },
        { endDate: { $lte: this.endDate } }
       ]
      },
      {
       $and: [
        { startDate: { $lte: this.startDate } },
        { endDate: { $gte: this.endDate } }
       ]
      }
     ]
    });

    if (conferences.length > 0) {
     return false;
    }
    return true;
   },
   message: 'Conferences time overlap'
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
 venue: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Venue',
  required: [true, 'A conference must hold in one address']
 },
 maxCoferenceSize: {
  type: Number,
  required: [true, 'A conference must have capacity size'],
  validate: {
   validator: async function (val) {
    let venue = await Venue.findById(this.venue);
    if (!venue) return false;

    if (venue.capacity >= val) return true;
    return false;
   },
   message: `A conference's size smaller than venue capacity`
  }
 },
 createdDate: {
  type: Date,
  default: Date.now()
 },
 active: {
  type: Boolean,
  default: true,
  select: false
 },
 slug: String
});

conferenceSchema.index({ name: 'text' });

conferenceSchema.plugin(mongoosePaginate);

conferenceSchema.pre('save', function (next) {
 this.slug = slugify(this.name, { lower: true });
 next();
});

conferenceSchema.pre(/^find/, function (next) {
 this.find().select('-__v');
 next();
});

conferenceSchema.pre(/^find/, function (next) {
 this.find({ active: { $ne: false } }).select('-__v');
 next();
});

conferenceSchema.pre(/^find/, function (next) {
 this.populate({
  path: 'venue',
  select: '-__v'
 });

 next();
});

const Conference = mongoose.model('Conference', conferenceSchema);
module.exports = Conference;
