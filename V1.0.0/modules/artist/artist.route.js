const express = require('express');
const route = express.Router()
const authS = require('./authorization/artist.auth')
const detS = require('./details/artist.details')
// Authorizing User

route.post('/newArtist' , authS.newArtist)
route.post('/loginArtist' , authS.loginArtist)
route.post('/sendOTP' , authS.sendOTP)
// route.get('/model' , detS.showRecords)
// route.post('/verifyOTP' , authS.verifyOTP)


module.exports = route