const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const AppError = require('./../ultilities/appError');

const venueSchema = new mongoose.Schema({
 name: {
  type: String,
  minlength: 10,
  maxlength: 1000,
  trim: true,
  required: [true, 'Venue must have name']
 },
 address: {
  type: String,
  minlength: 10,
  maxlength: 1000,
  trim: true,
  required: [true, 'Venue must have address']
 },
 capacity: {
  type: Number,
  min: [20, `Venue's capacity at least 20 participants`],
  required: [true, 'Venue must have capacity']
 },
 active: {
  type: Boolean,
  default: true,
  select: false
 }
});

venueSchema.plugin(mongoosePaginate);

const Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue;
