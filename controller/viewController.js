const catchAsync = require('./../ultilities/catchAsync');
const APIFeatures = require('./../ultilities/APIFeatures');
const AppError = require('./../ultilities/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
 const slides = [
  {
   image: 'slide-1.jpg',
   title: ['Yonex', 'Duora 10 Lengend'],
   subtitle: 'Mang đến trải nghiệm tuyệt vời',
   ref:
    '/vot-cau-long-yonex-duora-10-(legend-vision)-chinh-hang.60015254ac5db12d80c875a1'
  },
  {
   image: 'slide-2.jpg',
   title: ['Lining', 'Turbo Charging 75'],
   subtitle: 'Vợt tầm trung mạnh mẽ',
   ref: '/vot-cau-long-lining-turbo-charging-75.5ffc5d90f44e4f347c172cb3'
  },
  {
   image: 'slide-3.jpg',
   title: ['Yonex', 'Astrox 38S - rẻ bất ngờ'],
   subtitle: 'Mới ra mắt',
   ref: '/vot-cau-long-yonex-astrox-38s-new-chinh-hang.5ffc5d90f44e4f347c172ca3'
  }
 ];

 const banners = [
  {
   image: 'banner-1.jpg',
   title: 'Yonex',
   ref: '/vot-cau-long-yonex.cat'
  },
  {
   image: 'banner-2.jpg',
   title: 'Lining',
   ref: '/vot-cau-long-lining.cat'
  },
  {
   image: 'banner-3.jpg',
   title: 'Victor',
   ref: '/vot-cau-long-victor.cat'
  }
 ];

 res.status(200).render('index', {
  title: 'TTConference - Quản lý hội nghị dễ dàng',
  slides,
  banners,
  sectionConferences: [
   { title: 'Newest Conference', conferences: [] },
   { title: 'Incomming Conference', conferences: [] }
  ]
 });
});

exports.getLogin = catchAsync(async (req, res, next) => {
 res.status(200).render('login', {
  title: 'TTConference - Login'
 });
});

exports.getUserProfile = catchAsync(async (req, res, next) => {
 res.status(200).render('profile', {
  title: 'Profile'
 });
});
