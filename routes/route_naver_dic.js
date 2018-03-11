
var express = require('express');
var querystring = require('querystring');
var router = express.Router();
var beautify = require("json-beautify");
var cheerio = require('cheerio');
var request = require('request');
var striptags = require('striptags');
var prettyjson = require('prettyjson');
var fs = require('fs');
var youtubedl = require('youtube-dl');
var ffmpeg = require('fluent-ffmpeg');
var btc = require('better-try-catch')
const puppeteer = require('puppeteer');



router.get('/daum_dic', function (req, last_response, next) {

    var query = req.query.q;

    (async () => {
        const browser = await puppeteer.launch({
            headless: true
        });

        function delay(time) {
            return new Promise(function (resolve) {
                setTimeout(resolve, time)
            });
        }

        const page = await browser.newPage();
        await page.goto('http://dic.daum.net/search.do?q='+ query);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {


            var resultsJson = {
                title : [],
                sound : []
            }

            // var test1 = $('.dic_search_result').text();
            /*var test2 = $('.fnt_k05').text();*/

            $('.cleanword_type > .list_search > li ').each(function () {

                var title = $(this).text();


                resultsJson.title.push({
                    value : title

                })
            });

          /*
            $('.cleanword_type > .wrap_listen > .desc_listen  ').each(function () {

                sound = $(this).children().next().attr('href');


                resultsJson.sound.push({
                    value :   sound

                })
            });
*/

            return resultsJson;


        });

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)


    })();


});


router.get('/engdic', function (req, last_response, next) {


    var query = req.query.q;

    (async () => {
        const browser = await puppeteer.launch({
            headless: true
        });

        function delay(time) {
            return new Promise(function (resolve) {
                setTimeout(resolve, time)
            });
        }

        const page = await browser.newPage();
        await page.goto('http://dic.naver.com/search.nhn?x=0&y=0&query='+ query+  ' &target=dic&ie=utf8&query_utf=&isOnlyViewEE=dicQuery=' + query);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {


            var resultsJson = [];

            // var test1 = $('.dic_search_result').text();
            /*var test2 = $('.fnt_k05').text();*/

            $('.en_dic_section > .dic_search_result > dt ').each(function () {

                var title = $(this).find('.c_b').text();


                resultsJson.push({
                    title: title

                })
            });


            var i = 0;
            $('.en_dic_section> .dic_search_result > dd ').each(function () {

                var mean = $(this).text();


                resultsJson[i].mean = mean.replace('\n\t\t', '').replace('\n\t', '')


                i++
            });


            return resultsJson;


        });

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)

    })();

});

module.exports = router;
