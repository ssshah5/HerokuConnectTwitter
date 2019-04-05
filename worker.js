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
    console.log('Tweet: ',tweet);
  });
  stream.on('error', function(error) {
    console.error(error);
    throw error;
  });
});