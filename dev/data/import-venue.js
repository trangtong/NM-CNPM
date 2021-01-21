const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Venue = require('../../models/venueModel');

dotenv.config({ path: `./config.env` });

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PWD);
mongoose
 .connect(db, {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
 })
 .then(() => {
  console.log('Connect to database successful');
 });

const venues = JSON.parse(fs.readFileSync(`${__dirname}/data-venue.json`));

// import database
const importData = async () => {
 try {
  await Venue.create(venues);
  console.log('successful');
  process.exit();
 } catch (err) {
  console.log(err);
 }
};

//delete data
const deleteData = async () => {
 try {
  await Venue.deleteMany();
  console.log('successful');
  process.exit();
 } catch (error) {
  console.log(error);
 }
};

if (process.argv[2] === '--import') {
 importData();
} else if (process.argv[2] === '--delete') {
 deleteData();
}
