 // * `my-tweets`

 // * `spotify-this-song`

 // * `movie-this`

 // * `do-what-it-says`

//Twitter Keys request (link file)
var myTwitter = require('./keys.js');
//Twitter API 
var Twitter = require('twitter');
//Spotify API
var spotify = require('spotify');
//Request API (imdb)
var request = require('request');
// FS API
var fs = require('fs');

var consumerKey = myTwitter.twitterKeys.consumer_key;
var consumerSecret = myTwitter.twitterKeys.consumer_secret;
var accessToken = myTwitter.twitterKeys.access_token_key;
var accessTokenSecret = myTwitter.twitterKeys.access_token_secret;

//Twitter API npm documentation
var client = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
});//end client Twitter constructor

// empty arrays for songs and movies
var songsArray = [];
var moviesArray = [];

//when the user types my-tweets
var user = process.argv[2];
var search = process.argv;

//the maximum number of tweets to display
var count = 20;
var getmovie = "";

//switch statement that goes through each command the user enters
switch(user){
  case 'my-tweets':
    getTwitter(); //calls function    
    break;
  case 'spotify-this-song':
    getSpotify(); //calls function
    break;
  case 'movie-this':
    getFlick(); //calls function
    break;
  case 'do-what-it-says':
    getRead(); //calls function
    break;
}//end switch 

    //when user enters my-tweets for current tweets
    function getTwitter(){
        client.get('statuses/user_timeline.json?screen_name=codingbr&' + count, function (error, tweets, response) {
            //console.log(JSON.stringify(tweets, null, 2));
            for (var i = 0; i < tweets.length; i++) {
                console.log(JSON.stringify(tweets[i].created_at, null, 2));
                console.log(JSON.stringify(tweets[i].text, null, 2));
                console.log("*************************************************************");
            }//end for loop

        });//end function
    }//end getTwitter function

    function getSpotify(){
    //when user enters a song title
    if(user === "spotify-this-song" && process.argv[3] !== ""){
        
        for(var i = 3; i < search.length; i++){
            songsArray.push(search[i]);
        }//end for loop
        var getSong = songsArray.join(" ");
        //console.log(getSong);
        //spotify api call
        spotify.search({ type: 'track', query: getSong }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
                console.log("*************************************************************");
                //artist name
                console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
                //song name
                console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name, null, 2));
                //preview link of the song
                console.log("Preview Song: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
                //album name
                console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
                console.log("*************************************************************");
            });//end function
    }
  }//end getSpotify function

  function getFlick(){
    //when user enters movie title
    if(user === "movie-this" && process.argv[3] !== ""){
        for(var i = 3; i < search.length; i++){
            moviesArray.push(search[i]);
        }//end for loop
        getMovie = moviesArray.join(" ");
      }
      request('http://www.omdbapi.com/?t=' + getMovie, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred 
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
      
      console.log("*************************************************************");
      //Movie title 
      console.log("Movie Title: " + JSON.parse(body).Title);
      //Year release
      console.log("Year Released: " + JSON.parse(body).Year);
      //IMDB movie rating
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      //Countries where movie was fimled
      console.log("Country Produced: " + JSON.parse(body).Country);
      //Language available for the movie
      console.log("Language of Movie: " + JSON.parse(body).Language);
      //Plot of movie
      console.log("Movie Plot: " + JSON.parse(body).Plot);
      //Actors in the movie
      console.log("Actors: " + JSON.parse(body).Actors);
      //rotten tomatoes rating
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      //rotten tomatoes website
      console.log("Rotten Tomatoes Website: https://www.rottentomatoes.com/");
      console.log("*************************************************************");
    });//end movie function
  }//end getFlick function

function getRead(){
fs.readFile("random.txt", "utf8", function(error, response){
    console.log(response);
     spotify.search({ type: 'track', query: response }, function(err, data) {
        console.log("*************************************************************");
            //artist name
            console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
            //song name
            console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name, null, 2));
            //preview link of the song
            console.log("Preview Song: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
            //album name
            console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
            console.log("*************************************************************");
     });//end spotify function
  });
}//end getRead function