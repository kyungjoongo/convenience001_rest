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
    await page.goto('http://dic.naver.com/search.nhn?x=0&y=0&query=ionic&target=dic&ie=utf8&query_utf=&isOnlyViewEE=dicQuery=' + 'react');
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

        /*




         $('.fnt_k05 ').each(function () {

         resultsJson[i].value = $(this).text()
         i++;
         });*/


        return resultsJson;


    });

    /*await browser.close();*/

    console.log('', dimensions);


})();