var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');

let url = 'https://www.ministop.co.kr/MiniStopHomePage/page/querySimple.do?pageId=event/plus1&sqlnum=1&paramInfo=1%3A%3A' +
    '&sortGu=&tm=1520735205052&pageNum=1'


var request = require('request');
// Set the headers
var headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
// Configure the request
var options = {
    url: url,
    method: 'GET'
}

request(options, function (error, response, body) {

//    let result = JSON.parse(body);

    console.log('##############', body);



})






