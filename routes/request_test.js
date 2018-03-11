var request = require('request');
var beautify = require("json-beautify");



let url = 'http://gs25.gsretail.com/gscvs/ko/products/event-goods-search?CSRFToken=fd639596-25e4-4cf8-946f-21213039466d&pageNum=1&pageSize=8&searchType=&searchWord=&parameterList=ONE_TO_ONE'

request({url: url, method: 'GET'}, function (error, response, body) {


    let result = JSON.parse(body);
    console.log('##############', result);


})