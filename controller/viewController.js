const catchAsync = require('./../ultilities/catchAsync');
const APIFeatures = require('./../ultilities/APIFeatures');
const AppError = require('./../ultilities/appError');
const conferenceController = require('./../controller/conferenceController');
const Conference = require('../models/conferenceModel');

exports.getOverview = catchAsync(async (req, res, next) => {
 const slides = [
  {
   image: 'slide-1.jpg',
   title: ['Yonex', 'Duora 10 Lengend'],
   subtitle: 'Mang đến trải nghiệm tuyệt vời',
   ref: '/'
  },
  {
   image: 'slide-2.jpg',
   title: ['Lining', 'Turbo Charging 75'],
   subtitle: 'Vợt tầm trung mạnh mẽ',
   ref: '/'
  },
  {
   image: 'slide-3.jpg',
   title: ['Yonex', 'Astrox 38S - rẻ bất ngờ'],
   subtitle: 'Mới ra mắt',
   ref: '/'
  }
 ];

 const banners = [
  {
   image: 'banner-1.jpg',
   title: 'Yonex',
   ref: '/'
  },
  {
   image: 'banner-2.jpg',
   title: 'Lining',
   ref: '/'
  },
  {
   image: 'banner-3.jpg',
   title: 'Victor',
   ref: '/'
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
  banners,
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
 const id = slugWithID.split('.')[1];

 // conference
 const conference = await Conference.findById(id);

 // Paginate
 res.status(200).render('productDetail', {
  title: `TTConference | ${conference.name}`,
  conference
 });
});
