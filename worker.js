var Twitter = require('twitter');
var pg = require('pg');

console.log("********* Starting *******");
var tw = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

tw.stream('statuses/filter', {track: 'RaleighHackDay'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet);
    console.log('From:',tweet.user.name);
    console.log('Twitter_Name: ',tweet.user.screen_name);
    console.log('Text: ',tweet.text);
    // Connect with SF DB
    pg.connect(process.env.DATABASE_URL+'?ssl=true', function(err, client, done) {
      client.query('INSERT INTO salesforce.tweet__c (tweet_message__c, name, screen_Name__c) VALUES ($1, $2, $3)',
      [tweet.text.trim(), tweet.user.name.trim(), tweet.user.screen_name.trim()],
        function(err, result) {
          done();
        });
    });
  });
  stream.on('error', function(error) {
    console.error(error);
    throw error;
  });
});