const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true


    });
    const page = await browser.newPage();
    await page.goto('https://www.mp3juices.cc/');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {
        /* return {
         width: document.documentElement.clientWidth,
         height: document.documentElement.clientHeight,
         deviceScaleFactor: window.devicePixelRatio
         };*/

        /*    await new Promise(function(resolve) {
         setTimeout(resolve, 1500)
         });*/

        var resultsJson = [];

        $('#query').val('Gym class heroes fighters')

        $('#button').trigger('click');

        await new Promise(function(resolve) {
            setTimeout(resolve, 1000)
        });

        $('#result_1').children().next().next().children()[0].click();


        await new Promise(function(resolve) {
            setTimeout(resolve, 1500)
        });


        var link = $('.url').attr('href');

        resultsJson.push({
            "link": link

        })

        return resultsJson;


    });

    /*await browser.close();*/

    console.log('##############', dimensions);


})();