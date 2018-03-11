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
    await page.goto('http://www.7-eleven.co.kr/product/listMoreAjax.asp?intPageSize=10&cateCd1=&cateCd2=&cateCd3=&pTab=3&intCurrPage=1');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {


        var resultsJson = [];



        $('body  > li ').each(function () {

            var tag_list_01 = $(this).find('.tag_list_01').children().text();
            var img = $(this).find('img').attr('src');
            var alt = $(this).find('img').attr('alt');
            //price_list
            var price_list = $(this).find('.price_list').children().text();

            if ( tag_list_01 !=''){
                resultsJson.push({
                    type : tag_list_01,
                    image: 'http://www.7-eleven.co.kr/'+ img,
                    desc:alt,
                    price:price_list
                })

            }


        });

        return resultsJson;


    });

    /*await browser.close();*/



    console.log('', dimensions);
    console.log('', dimensions.length);

})();