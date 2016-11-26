var express = require('express')
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var Twit = require('twit');
// var config = require('./config/config.json');
// var usStates = require('./public/us.json');

http.listen(8080, function(){
   console.log('app listening on port 8080.');
});

var client = new Twit({
  consumer_key: "GVtH1ej4Kd4FvbtueO27E3wI8",
  consumer_secret: "LWTf5s3Jy1YSxv7INFhzKLEUBJhtMUQv2AilDuOcpXh0IWry5R",
  access_token: "768253086607429632-wbIchq8u08Eg0Cyk1Cs2ZvQR5EU9Q2Z",
  access_token_secret: "JG1CiSpiNRtV1dzr38d1pgTeu8Q60LBUSCRr3J0LauUgX"
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
});

app.use('/', express.static(__dirname + '/public'));

// function handler (req, res) {
//   fs.readFile(__dirname + '/public/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }
//     res.writeHead(200);
//     res.end(data);
//   });
// }

var watchTags = ['#cop22', '#pollution','#climatechange','#globalwarming','#energy'];

// keep the total number of tweets received and how many tweets received of that symbol
var watchList = {
    total: 0,
    symbols: {}
};

 //Set the watch symbols to zero.
watchTags.forEach(function(v){
  watchList.symbols[v] = 0;
});

io.on('connection', function(socket) {

            var tweetStream = client.stream('statuses/filter', {track: watchTags});

            function mapTweet(tweet) {
                    return {coordinates: tweet.coordinates};
                       }

            tweetStream.on('tweet', function (tweet) {

                tweet.entities.hashtags.forEach(function (hashtag) {
                    var hashStr = normalize(hashtag.text); 

                    if (watchTags.indexOf(hashStr) > -1) {
                        watchList.symbols[hashStr]++;
                        socket.emit('message', {name: hashStr});
                    }
                });
                  if(!tweet.coordinates) { return; }
                    // saveTweet(tweet);
                   socket.emit("tweet", mapTweet(tweet));
            });

    });


var normalize = function(trend) {
  var trendNrmlz = trend.toLowerCase();
  if (trendNrmlz.indexOf('#') == -1) {
    trendNrmlz = '#' + trendNrmlz;
  }
  if (trendNrmlz.indexOf(' ') > -1) {
    trendNrmlz = trendNrmlz.replace(/ /g, '');
  }
  return trendNrmlz;
};

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

