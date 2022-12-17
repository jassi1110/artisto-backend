var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
var url = process.env.MONGO_URI;

const formatDetails = (arr)=>{
  return arr.map(x=>{
    return{
      artistName:x.Artist,
      Rating : x.rating,
      "Number of Ratings" : x['num of ratings']
    }
  })
}

exports.checkRegistration = async (collection, phone) => {

  return new Promise((res, rej) => {
    obj = []
    MongoClient.connect(url, function (err, db) {
      if (err) rej(err);
      var dbo = db.db(process.env.DBNAME);
      dbo.collection(`${collection}`).findOne({ "phone": phone }, function (err, result) {
        if (err) throw err;
        obj.push(result);
        res(obj);
        db.close();
      });
    });
  })
}
exports.addArtist = async (collection, key) => {

  return new Promise((res, rej) => {

    MongoClient.connect(url, function (err, db) {
      if (err) rej(err);
      var dbo = db.db(process.env.DBNAME);
      dbo.collection(`${collection}`).insertOne(key, function (err, result) {
        if (err) throw err;
        console.log(result);
        res(result);
        db.close();
      });
    });
  })
}
exports.updateArtist = async (collection, key, id) => {

  return new Promise((res, rej) => {

    MongoClient.connect(url, function (err, db) {
      if (err) rej(err);
      var dbo = db.db(process.env.DBNAME);
      dbo.collection(`${collection}`).updateOne(id, key, function (err, result) {
        if (err) throw err;
        // console.log(result);
        res(result);
        db.close();
      });
    });
  })
}
exports.addOTP = async (collection, key) => {

  return new Promise((res, rej) => {

    MongoClient.connect(url, function (err, db) {
      if (err) rej(err);
      var dbo = db.db(process.env.DBNAME);
      dbo.collection(`${collection}`).insertOne(key, function (err, result) {
        if (err) throw err;
        // console.log(result);
        res(result);
        db.close();
      });
    });
  })
}
exports.checkOTP = async (collection, email) => {
  obj = []
  return new Promise((res, rej) => {

    MongoClient.connect(url, function (err, db) {
      if (err) rej(err);
      var dbo = db.db(process.env.DBNAME);
      dbo.collection(`${collection}`).findOne({ email: `${email}` }, function (err, result) {
        if (err) throw err;
        // console.log(result);
        obj.push(result);
        res(obj);
        db.close();
      });
    });
  })
}

exports.artistDetails = async (collection) => {

  return new Promise((res, rej) => {
    obj = []
    MongoClient.connect(url, function (err, db) {
      if (err) rej(err);
      var dbo = db.db(process.env.DBNAME);
      dbo.collection(`${collection}`).find({}).toArray(function (err, result) {
        if (err) throw err;
        // obj.push(result);
        // res(obj);
        res(formatDetails(result))
        db.close();
      });
    });
  })
}

// const helper = async()=>{
//   const d = await this.artistDetails('ml');
  
//   console.log(formatDetails(d));
// }

// helper()
