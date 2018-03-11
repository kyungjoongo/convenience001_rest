var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');
const puppeteer = require('puppeteer');
var beautify = require("json-beautify");
var Iconv1 = require('iconv').Iconv;

router.get('/emart24_list', function (req, last_response, next) {

    /*1n1
    2n1
    SALE
    X2*/



    var _page = req.query.page;
    var tab = req.query.tab;
    request({
        url: 'https://www.emart24.co.kr/product/eventProduct.asp?productCategory='+ tab+ '&cpage='+ _page,
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
            var img = $(this).find('.productImg').children().attr('src');
            var alt = $(this).find('.productDiv').text();
            //price_list
            var prodPrice = $(this).find('.price').text();


            resultsJson.push({
                type: type,
                image: 'https://www.emart24.co.kr/'+ img,
                prodName: alt,
                prodPrice: prodPrice
            })


        });

        console.log('##############', resultsJson);


        last_response.json(resultsJson)
    });



});


router.get('/seven11_list', function (req, last_response, next) {
    var _page = req.query.page;
    var tab = req.query.tab;



    let uri= 'http://www.7-eleven.co.kr/product/listMoreAjax.asp?intPageSize=20&cateCd1=&cateCd2=&cateCd3=&pTab=' + tab + '&intCurrPage=' + _page;


    request({url: uri, method: 'GET'}, function (error, response, body) {

        var $ = cheerio.load(body);

        var resultsJson = [];

        $('body  > li ').each(function () {

            var tag_list_01 = $(this).find('.tag_list_01').children().text();
            var img = $(this).find('img').attr('src');
            var alt = $(this).find('img').attr('alt');
            //price_list
            var price_list = $(this).find('.price_list').children().text();

            if (tag_list_01 != '') {
                resultsJson.push({
                    type: tag_list_01,
                    image: 'http://www.7-eleven.co.kr/' + img,
                    prodName: alt,
                    prodPrice: price_list
                })

            }


        });

        console.log('##############', resultsJson);


        last_response.json(resultsJson)

    })





});


router.get('/ministop_list/', function (req, last_response, next) {

    var page = req.query.page;
    var tab = req.query.tab;


    let url = '';
    if (tab == '1') {
        url = 'https://www.ministop.co.kr/MiniStopHomePage/page/querySimple.do?pageId=event/plus1&sqlnum=1&paramInfo=1%3A%3A&sortGu=&tm=1520735205052&pageNum='
    } else if (tab == '2') {
        url = 'https://www.ministop.co.kr/MiniStopHomePage/page/querySimple.do?pageId=event/plus2&sqlnum=1&paramInfo=2%3A%3A&sortGu=&tm=1520736565176&pageNum='
    }

    console.log('##############', tab);

    url = url + page;

    request({url: url, method: 'GET'}, function (error, response, body) {

        last_response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        last_response.end(body)

    })

});


router.get('/gs25_list/', function (req, last_response, next) {

    var page = req.query.page;
    var tab = req.query.tab;

    //ONE_TO_ONE
    //TWO_TO_ONE
    //GIFT

    let url = 'http://gs25.gsretail.com/gscvs/ko/products/event-goods-search?CSRFToken=fd639596-25e4-4cf8-946f-21213039466d' +
        '&pageSize=20&searchType=&searchWord=&parameterList=' + tab + '&pageNum=' + page;


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

        let result = JSON.parse(body);

        console.log('##############', result);


        last_response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});


        last_response.end(result)

    })

});


router.get('/cu_list/', function (req, last_response, next) {

    var _page = req.query.page;
    var tab = req.query.tab;

    (async () => {
        const browser = await puppeteer.launch({
            headless: true


        });
        /*pageIndex=1&listType=0&searchCondition=23&user_id=*/

        /*

         1+1 --> 23
         2+1 ---> 24
         3+1 ---> 49
         */

        const page = await browser.newPage();
        await page.goto('http://cu.bgfretail.com/event/plusAjax.do?listType=1&searchCondition=' + tab + '&user_id&pageIndex=' + _page);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.3.1.js'})

        const dimensions = await page.evaluate(async () => {

            let resultsJson = [];


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

            return resultsJson;


        });


        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)


    })();

});


module.exports = router;
