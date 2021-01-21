const Conference = require('./../models/venueModel');
const catchAsync = require('./../ultilities/catchAsync');
const AppError = require('../ultilities/appError');
const APIFeatures = require('../ultilities/APIFeatures.js');

exports.getgetVevues = catchAsync(async (req, res, next) => {
 if (!req.query) {
  return new AppError('Empty query', 404);
 }

 if (!Number(req.query.limit)) {
  return new AppError('Provide limit query', 404);
 }

 let query = Venue.find();

 const feature = new APIFeatures(query, req.query);
 feature.filter().sort();

 Conference.paginate(query, {
  page: req.query.page > 0 ? req.query.page : 1,
  limit: req.query.limit
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
