var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');




let url = 'http://cu.bgfretail.com/event/plusAjax.do?listType=1&searchCondition=&user_id&pageIndex=1'

request({url: url, method: 'GET'}, function (error, response, body) {

    var $ = cheerio.load(body);

    var resultsJson = [];


    $('ul >  li ').each(function () {

        var image = $(this).find('.photo').children().children().attr('src')

        var prodName = $(this).find('.prodName').text();
        var prodPrice = $(this).find('.prodPrice').text();
        var type = $(this).find('.prodPrice').next().children().text();

        if (prodName != '' && prodName != undefined) {

            resultsJson.push({
                image: image,
                prodName: prodName,
                prodPrice: prodPrice,
                type: type

            })
        }


    });

    console.log('##############', resultsJson);




})







