const User = require('./../models/userModel');
const catchAsync = require('./../ultilities/catchAsync');

const multer = require('multer');
const AppError = require('../ultilities/appError');
const crypto = require('crypto');
const APIFeatures = require('../ultilities/APIFeatures.js');

// errro when upload > 5 files (default)
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/users');
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
    cb(new AppError('Định dạng không được hỗ trợ'), false);
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  if (!req.query) {
    return new AppError('Something error', 500);
  }

  let query = User.find().select('+active');

  if (req.query.email) {
    query = User.find({
      email: { $regex: `${req.query.email}`, $options: 'i' }
    });
    req.query.email = undefined;
  }

  const feature = new APIFeatures(query, req.query);
  feature.filter().sort();

  User.paginate(query, {
    page: req.query.page > 0 ? req.query.page : 1,
    limit: req.query.limit > 0 ? req.query.limit : 0
  })
    .then((result) => {
      res.setHeader('X-Paging-Count', `${result.totalPages}`);
      res.setHeader('X-Paging-Current', `${result.page}`);

      res.status(200).json({
        status: 'success',
        data: {
          users: result.docs
        }
      });
    })
    .catch((err) => console.log(err));
});

exports.getUserByID = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// just for update information
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Not use for update password', 400));
  }

  if (req.file) {
    req.body.photo = req.file.filename;
  }

  const updateUser = {
    name: req.body.name,
    lastName: req.body.lastName,
    phone: req.body.phone,
    address: req.body.address,
    photo: req.body.photo
  };

  Object.keys(updateUser).forEach((key) => {
    if (updateUser[key] === 'undefined') {
      delete updateUser[key];
    }
  });

  let user = await User.findByIdAndUpdate(req.user.id, updateUser, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: 'success'
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  if (req.user._id == req.params.id) {
    return new AppError('Không thể tự xoá tài khoản');
  }

  await User.findByIdAndUpdate(req.params.id, { active: false });

  res.status(204).json({
    status: 'success'
  });
});
