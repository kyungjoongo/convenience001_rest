/*
https://youtubemp3api.com/@grab?vidID=0hG_I8USKIc&format=mp3&streams=mp3&api=button*/



var request = require('request');
request('https://youtubemp3api.com/@api/button/mp3/0hG_I8USKIc', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});