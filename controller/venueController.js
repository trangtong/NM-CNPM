const Venue = require('./../models/venueModel');
const catchAsync = require('./../ultilities/catchAsync');
const AppError = require('../ultilities/appError');
const APIFeatures = require('../ultilities/APIFeatures.js');

exports.getVenues = catchAsync(async (req, res, next) => {
 if (!req.query) {
  return next(new AppError('Empty query', 404));
 }

 if (!Number(req.query.limit)) {
  return next(new AppError('Provide limit query', 404));
 }

 let query = Venue.find().select('+active');

 const feature = new APIFeatures(query, req.query);
 feature.filter().sort();

 Venue.paginate(query, {
  page: req.query.page > 0 ? req.query.page : 1,
  limit: Number(req.query.limit)
 })
  .then((result) => {
   res.setHeader('X-Paging-Count', `${result.totalPages}`);
   res.setHeader('X-Paging-Current', `${result.page}`);

   res.status(200).json({
    status: 'success',
    data: {
     venues: result.docs
    }
   });
  })
  .catch((err) => console.log(err));
});
