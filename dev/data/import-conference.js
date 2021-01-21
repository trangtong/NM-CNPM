const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Conference = require('../../models/conferenceModel');

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

const conferences = JSON.parse(
 fs.readFileSync(`${__dirname}/data-conference.json`)
);

// import database
const importData = async () => {
 try {
  await Conference.create(conferences);
  console.log('successful');
  process.exit();
 } catch (err) {
  console.log(err);
 }
};

//delete data
const deleteData = async () => {
 try {
  await Conference.deleteMany();
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
