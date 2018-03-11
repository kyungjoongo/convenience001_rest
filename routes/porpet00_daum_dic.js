const puppeteer = require('puppeteer');


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
    await page.goto('http://dic.daum.net/search.do?q=react&dic=eng');
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
        });*/


        return resultsJson;


    });

    /*await browser.close();*/

    console.log('', dimensions);


})();