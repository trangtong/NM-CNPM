const catchAsync = require('./../ultilities/catchAsync');
const APIFeatures = require('./../ultilities/APIFeatures');
const AppError = require('./../ultilities/appError');
const conferenceController = require('./../controller/conferenceController');
const Conference = require('../models/conferenceModel');

exports.getOverview = catchAsync(async (req, res, next) => {
 const slides = [
  {
   image: 'slide-1.jpg',
   title: ['Con người', 'với Cách mạng Công nghiệp 4.0'],
   subtitle: 'Cập nhật ngay',
   ref:
    '/vai-tro-con-nguoi-trong-thoi-djai-cong-nghiep-4.0.600ad0e15caad7536e8cacf9'
  },
  {
   image: 'slide-2.jpg',
   title: ['Triển lãm', 'nghệ thuật QG'],
   subtitle: 'Sắp diễn ra',
   ref: '/hoi-nghi-trien-lam-ve-nghe-thuat-quoc-gia.600ad0e15caad7536e8cacf7'
  },
  {
   image: 'slide-3.jpg',
   title: ['Ứng dụng AI', 'TP thông minh'],
   subtitle: '',
   ref:
    '/hoi-nghi-ung-dung-tri-tue-nhan-tao-trong-viec-van-hanh-thanh-pho-thong-minh.600ad0e15caad7536e8cacf8'
  }
 ];

 // Incomming
 const queryIncomming = Conference.find({ startDate: { $gt: Date.now() } })
  .sort('-startDate')
  .limit(10);

 // Incomming
 const queryNewest = Conference.find().sort('-createdDate').limit(10);

 const [conferenceIncomming, conferenceNewest] = [
  await queryIncomming,
  await queryNewest
 ];

 res.status(200).render('index', {
  title: 'TTConference - Quản lý hội nghị dễ dàng',
  slides,
  sectionConferences: [
   { title: 'Newest Conference', conferences: conferenceNewest },
   { title: 'Incomming Conference', conferences: conferenceIncomming }
  ]
 });
});

exports.getLogin = catchAsync(async (req, res, next) => {
 if (req.user) {
  res.redirect('/');
 }

 res.status(200).render('login', {
  title: 'TTConference - Login'
 });
});

exports.getUserProfile = catchAsync(async (req, res, next) => {
 if (!req.user) {
  res.redirect('/');
 }

 res.status(200).render('profile', {
  title: 'Profile'
 });
});

exports.getChangePassword = catchAsync(async (req, res, next) => {
 if (!req.user) res.redirect('/');
 res.status(200).render('passwordUpdate', {
  title: 'Change password'
 });
});

exports.getResetPassword = catchAsync(async (req, res, next) => {
 if (!req.user) res.redirect('/');
 res.status(200).render('passwordReset', {
  title: 'Reset password'
 });
});

exports.getAllConference = catchAsync(async (req, res, next) => {
 const query = Conference.find();
 const feature = new APIFeatures(query, req.query);
 feature.filter().sort();

 Conference.paginate(query, {
  page: req.query.page >= 1 ? req.query.page : 1,
  limit: 10
 })
  .then((result) => {
   let options = {
    title: 'Tất cả hội nghị',
    paginateRes: result,
    conferences: result.docs
   };

   if (req.query.style === 'row') {
    res.status(200).render('listingRow', options);
   } else {
    res.status(200).render('listingGrid', options);
   }
  })
  .catch((err) => {
   return next(new AppError('Page not found', 404));
  });
});

exports.getConferenceDetail = catchAsync(async (req, res, next) => {
 const slugWithID = req.params.slugWithID;
 const id = slugWithID.split('.').pop();

 // conference
 const conference = await Conference.findById(id);

 // Paginate
 res.status(200).render('productDetail', {
  title: `TTConference | ${conference.name}`,
  conference
 });
});
