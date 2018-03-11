
/*Consumer Key:
    97503ad1ebf86fcf0760e26a27f5edaf
Consumer Secret:
    0915495d0b030b81791a5cbe44d3a41a5724d7dc*/


var OAuth = require('oauth');

it('tests trends Twitter API v1.1',function(done){
    var oauth = new OAuth.OAuth(
        'https://api.4shared.com/v1_2/oauth/initiate',
        'https://api.4shared.com/v1_2/oauth/token',
        '97503ad1ebf86fcf0760e26a27f5edaf',
        '0915495d0b030b81791a5cbe44d3a41a5724d7dc',
        '1.0A',
        null,
        'HMAC-SHA1'
    );
    oauth.get(
        'https://api.twitter.com/1.1/trends/place.json?id=23424977',
        'your user token for this app', //test user token
        'your user secret for this app', //test user secret
        function (e, data, res){
            if (e) console.error(e);
            console.log(require('util').inspect(data));
            done();
        });
});
