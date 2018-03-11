var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');


router.get('/gs25/', function (req, last_response, next) {

    var request = require('request');
    var beautify = require("json-beautify");

    let uri = 'http://gs25.gsretail.com/gscvs/ko/products/event-goods-search?CSRFToken=d51135ba-2571-4981-952a-f0a5ced38a6f&pageNum=1&pageSize=8&searchType=&searchWord=&parameterList=ONE_TO_ONE';


    var request = require('request');

// Set the headers
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }

// Configure the request
    var options = {
        url: uri,
        method: 'GET',
        encoding: null

    }

// Start the request
    request(options, function (error, response, body) {

        var data = iconv.convert(body).toString();

        last_response.json(data)

        //last_response.json(body)

    })





});


router.get('/apt222/', function (req, last_response, next) {

    var baseUri = 'https://m.apt2you.com/viewAptSaleHouseList.action?compareDate=201802&houseGubunCode=03&sidoCode=201'

    var request = require('request');

    var requestOptions = {
        method: "POST",
        uri: baseUri,
        headers: {"User-Agent": "Mozilla/5.0"},
        encoding: null
    };

    /*
     var options = {
     url: baseUri,
     encoding: null
     };*/

    request(requestOptions, function (error, response, body) {


        var resultArray = [];

        var strContents = new Buffer(body, 'binary');


        //noinspection JSAnnotator
        $ = cheerio.load(strContents);

        $('.tb_type01 > table > tbody > tr').each(function () {


            var rank = $(this).html();


            var result = {


                rank: rank


            }


            resultArray.push(result)

        });

        /*console.log('##############'+ JSON.stringify(resultArray));*/

        console.log('##############', resultArray)

        last_response.json(resultArray)

    });


});


router.get('/youtube_video/', function (req, last_response, next) {


    var apiKey = 'AIzaSyCUMLRaMiBgIcQiOwR--735jG-Dhgvg8B8';
    var params = '?maxResults=1&part=snippet&q=' + encodeURI('겨울달') + '&key=' + apiKey;
    var baseUri = 'https://www.googleapis.com/youtube/v3/search' + params;

    var res = syncrequest('GET', baseUri);
    var beautify = require("json-beautify");

    let parsendResult = JSON.parse(res.getBody());

    var resultArray = [];
    last_response.json(parsendResult.items[0]);
});


//##############################

router.get('/youtube_video_v2/', function (req, last_response, next) {

    var apiKey = 'AIzaSyCUMLRaMiBgIcQiOwR--735jG-Dhgvg8B8';
    var params = '?maxResults=2&part=snippet&q=' + encodeURI('주인공선미') + '&key=' + apiKey;
    var baseUri = 'https://www.googleapis.com/youtube/v3/search' + params;


    request({
        url: baseUri,
        method: 'GET'
    }, function (err, _response, body) {
        //it works!

        var blogArrray = JSON.parse(body).items[0].id.videoId;


        last_response.json(blogArrray);
    });


});


router.get('/melon_rank/', function (req, last_response, next) {


    var startDate = '20180301';
    var endDate = '20180308';

    var baseUri = 'http://www.melon.com/chart/week/index.htm#params%5Bidx%5D=1&params%5BisFirstDate%5D=false&params%5BisLastDate%5D=true'
        + '&params[startDay]=' + startDate + '&params[endDay]=' + endDate;


    var baseUri2 = 'http://www.melon.com/chart/week/index.htm#params%5Bidx%5D=51&params%5BisFirstDate%5D=false&params%5BisLastDate%5D=true';
    +'&params[startDay]=' + startDate + '&params[endDay]=' + endDate;


    var res = syncrequest('GET', baseUri);
    var beautify = require("json-beautify");

    var resultArray = [];

    console.log(res.getBody());

    //noinspection JSAnnotator
    $ = cheerio.load(res.getBody());

    $('.service_list_song > table > tbody > tr').each(function () {

        var rank = $(this).find('td:nth-child(2)').text().replace('\n\t', '');
        var image = $(this).find('td:nth-child(4)').children().children().children().attr('src');
        var singer = $(this).find('td:nth-child(6)').children().children().children().next().next().children().children().text();
        var song_name = $(this).find('td:nth-child(6)').children().children().children().children().children().text().replace(singer, '');

        var album_name = $(this).find('td:nth-child(7)').children().children().children().children().attr('title').replace('- 페이지 이동', '');

        var result = {
            rank: rank,
            image: image,
            song_name: song_name,
            singer: singer,
            album_name: album_name
        }

        resultArray.push(result)

    });


    last_response.json(resultArray);


});

router.get('/melon_rank_rnb/', function (req, last_response, next) {

    var startDate = '20180301';
    var endDate = '20180308';


    var baseUri = 'http://www.melon.com/chart/week/index.htm?classCd=GN1300#params%5Bidx%5D=1&params%5BisFirstDate%5D=false&params%5BisLastDate%5D=true'
        + '&params[startDay]=' + startDate + '&params[endDay]=' + endDate;


    var res = syncrequest('GET', baseUri);
    var beautify = require("json-beautify");

    var resultArray = [];

    console.log(res.getBody());

    //noinspection JSAnnotator
    $ = cheerio.load(res.getBody());

    $('.service_list_song > table > tbody > tr').each(function () {

        var rank = $(this).find('td:nth-child(2)').text().replace('\n\t', '');
        var image = $(this).find('td:nth-child(4)').children().children().children().attr('src');
        var singer = $(this).find('td:nth-child(6)').children().children().children().next().next().children().children().text();
        var song_name = $(this).find('td:nth-child(6)').children().children().children().children().children().text().replace(singer, '');

        var album_name = $(this).find('td:nth-child(7)').children().children().children().children().attr('title').replace('- 페이지 이동', '');

        var result = {
            rank: rank,
            image: image,
            song_name: song_name,
            singer: singer,
            album_name: album_name
        }

        resultArray.push(result)

    });


    last_response.json(resultArray);


});


router.get('/melon_rank_pop/', function (req, last_response, next) {


    var startDate = '20180301';
    var endDate = '20180308';


    var baseUri = 'http://www.melon.com/chart/week/index.htm?classCd=GN0900#params%5Bidx%5D=1&params%5BisFirstDate%5D=false&params%5BisLastDate%5D=true'
        + '&params[startDay]=' + startDate + '&params[endDay]=' + endDate;


    var res = syncrequest('GET', baseUri);
    var beautify = require("json-beautify");

    var resultArray = [];

    console.log(res.getBody());

    //noinspection JSAnnotator
    $ = cheerio.load(res.getBody());

    $('.service_list_song > table > tbody > tr').each(function () {

        var rank = $(this).find('td:nth-child(2)').text().replace('\n\t', '');
        var image = $(this).find('td:nth-child(4)').children().children().children().attr('src');
        var singer = $(this).find('td:nth-child(6)').children().children().children().next().next().children().children().text();
        var song_name = $(this).find('td:nth-child(6)').children().children().children().children().children().text().replace(singer, '');

        var album_name = $(this).find('td:nth-child(7)').children().children().children().children().attr('title').replace('- 페이지 이동', '');

        var result = {
            rank: rank,
            image: image,
            song_name: song_name,
            singer: singer,
            album_name: album_name
        }

        resultArray.push(result)

    });


    last_response.json(resultArray);


});


function getYoutubueVideoId(title) {


    var apiKey = 'AIzaSyCUMLRaMiBgIcQiOwR--735jG-Dhgvg8B8';
    var params = '?maxResults=1&part=snippet&q=' + encodeURI(title) + '&key=' + apiKey;
    var baseUri = 'https://www.googleapis.com/youtube/v3/search' + params;

    var res = syncrequest('GET', baseUri);
    var beautify = require("json-beautify");

    let parsendResult = JSON.parse(res.getBody());

    var resultArray = [];
    //last_response.json(parsendResult.items[0].id.videoId);

    var videoId = parsendResult.items[0].id.videoId

    return videoId;

}


router.get('/get_youtube_video/', function (req, last_response, next) {

    var title = req.query.title;


    var id = getYoutubueVideoId(title)


    last_response.json({id: id});

});


module.exports = router;
