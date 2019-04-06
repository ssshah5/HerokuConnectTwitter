var Twitter = require('twitter');
const { Client } = require('pg');

console.log("********* Starting *******");
var tw = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Connect with SF DB
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

tw.stream('statuses/filter', {track: 'RaleighHackDay'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log('From: ',tweet.name);
    console.log('Twitter_Name: ',tweet.screen_name);
    console.log('Text: ',tweet.text);
  });
  stream.on('error', function(error) {
    console.error(error);
    throw error;
  });
});