var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');
var Iconv1 = require('iconv').Iconv;



var headers =
    {
        'Content-Type': 'text/html;charset=EUC-KR'
    }


request({
    url: 'https://www.emart24.co.kr/product/eventProduct.asp?productCategory=&cpage=1',
    method: 'GET'
    , headers: {"User-Agent": "Mozilla/5.0"}
    , encoding: null

}, function (error, response, body) {

    var strContents = new Buffer(body, 'binary');
    iconv = new Iconv1('euc-kr', 'UTF8');

    strContents = iconv.convert(strContents).toString();

    var $ = cheerio.load(strContents);

    var resultsJson = [];

    /*response.writeHeader(200, {'Content-Type': 'text/html;charset=UTF-8'});*/

    $('.categoryListNew  > li ').each(function () {

        var type = $(this).find('.txtNo').children().attr('alt')
        var img = $(this).find('img').attr('src');
        var alt = $(this).find('.productDiv').text();
        //price_list
        var prodPrice = $(this).find('.price').text();


        resultsJson.push({
            type: type,
            image: img,
            prodName: alt,
            prodPrice: prodPrice
        })


    });

    console.log('##############', resultsJson);
});









