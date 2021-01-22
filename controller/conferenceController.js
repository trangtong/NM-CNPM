const Conference = require('./../models/conferenceModel');
const catchAsync = require('./../ultilities/catchAsync');

const multer = require('multer');
const AppError = require('./../ultilities/appError');
const crypto = require('crypto');
const APIFeatures = require('../ultilities/APIFeatures.js');

// errro when upload > 5 files (default)
const diskStorage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, 'public/img/conferences');
 },

 filename: function (req, file, cb) {
  const ext = file.mimetype.split('/')[1];

  const randomStr = crypto.randomBytes(24).toString('hex');
  cb(null, randomStr + Date.now().toString() + '.' + ext);
 }
});

const multerFilter = (req, file, cb) => {
 if (file.mimetype.startsWith('image')) {
  cb(null, true);
 } else {
  cb(new AppError('Not support type'), false);
 }
};

const upload = multer({
 storage: diskStorage,
 fileFilter: multerFilter
});

exports.uploadConferencePhotos = upload.fields([
 {
  name: 'imageCover',
  maxCount: 1
 },
 {
  name: 'images',
  maxCount: 5
 }
]);

exports.getConferences = catchAsync(async (req, res, next) => {
 if (!req.query) {
  return next(new AppError('Empty query', 404));
 }

 if (!Number(req.query.limit)) {
  return next(new AppError('Provide limit query', 404));
 }

 let query = Conference.find().select('+active');

 if (req.query.name) {
  query = Conference.find({
   name: { $regex: `${req.query.name}`, $options: 'i' }
  });
  req.query.name = undefined;
 }

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
     conferences: result.docs
    }
   });
  })
  .catch((err) => console.log(err));
});
