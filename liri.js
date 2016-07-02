var fs = require('fs');
var argOne = process.argv[2];
var argTwo = process.argv[3];
var request = require('request');

//Twitter----------------------------------------------

var keys = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});
var params = {count: 20};

//Spotify----------------------------------------------

var spotify = require('spotify');

//Twitter-----------------------------------------------

function getTweets(){
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if(!error){
			for(var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text + " Posted on: " + tweets[i].created_at + "\n");
			}
		} else {
			console.log(error);
		}
	});
}

//Spotify-----------------------------------------------

function getSong(){
	var queryInput = "what's my age again";
	if (argTwo !== undefined) {
		queryInput = argTwo;
	}
	spotify.search({ type: 'track', query: queryInput, count: 1}, function(err, data){
		if(err){
			console.log('Error: ' + err);
			return;
		}
		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Song: " + data.tracks.items[0].name);
		console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
		console.log("Album: " + data.tracks.items[0].album.name);
		fs.appendFile('log.txt', "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song: " + data.tracks.items[0].name + "\n" + "Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify + "\n" + "Album: " + data.tracks.items[0].album.name); 
	});
}

//OMBD-RottenTomato--------------------------------------
function getMovie(){
	var queryInput = "Mr. Nobody";
	if(argTwo !== undefined) {
		queryInput = argTwo;
	}
request('http://www.omdbapi.com/?t=' + queryInput + "&tomatoes=true", function(error, response, body){
	if(!error && response.statusCode == 200){
		var movieInfo = JSON.parse(body);
		console.log("Title: " + movieInfo.Title);
		console.log("Year: " + movieInfo.Year);
		console.log("IMDB Rating: " + movieInfo.imdbRating);
		console.log("Country: " + movieInfo.Country);
		console.log("Language: " + movieInfo.Language);
		console.log("Plot: " + movieInfo.Plot);
		console.log("Actors: " + movieInfo.Actors);
		console.log("Rotten Tomatoes Rating: " + movieInfo.tomatoesRating);
		console.log("Rotten Tomatoes URL: " + movieInfo.tomatoesURL);
		fs.appendFile('log.txt', "Title: " + movieInfo.Title + "\n" + "Year: " + movieInfo.Year + "\n" + "IMDB Rating: " + movieInfo.imdbRating + "\n" + "Country: " + movieInfo.Country + "\n" + "Language: " + movieInfo.Language + "\n" + "Plot: " + movieInfo.Plot + "\n" + "Actors: " + movieInfo.Actors + "\n" + "Rotten Tomatoes Rating: " + movieInfo.tomatoesRating + "\n" + "Rotten Tomatoes URL: " + movieInfo.tomatoesURL);
	}
	else {
		console.log(error);
	}
	});
}

//The Rest-------------------------------------------------

function getRandom() {
	fs.readFile("random.txt", "utf8", function(error, data){
		//show if error occurs
		if(error){
			console.log(error);
		} else {
			var dataArray = data.split(',');
			var argOne = dataArray[0];
			var argTwo = dataArray[1];
			switch(argOne) {
				case "my-tweets":
				getTweets();
				break;
				case "spotify-this-song":
					function getSong(){
						var queryInput = "what's my age again";
						if (argTwo !== undefined) {
							queryInput = argTwo;
						}
						spotify.search({ type: 'track', query: queryInput, count: 1}, function(err, data){
							if(err){
								console.log('Error: ' + err);
								return;
							}
							console.log("Artist: " + data.tracks.items[0].artists[0].name);
							console.log("Song: " + data.tracks.items[0].name);
							console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
							console.log("Album: " + data.tracks.items[0].album.name);
							fs.appendFile('log.txt', "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song: " + data.tracks.items[0].name + "\n" + "Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify + "\n" + "Album: " + data.tracks.items[0].album.name); 
						});

					}
					getSong();
					break;
					case "movie-this":
						function getMovie(){
							var queryInput = "Mr.Nobody";
							if(argTwo !== undefined) {
								queryInput = argTwo;
							}
							request('http://www.omdbapi.com/?t=' + queryInput + "&tomatoes=true", function(error, response, body){
								if(!error && response.statusCode == 200){
									var movieInfo = JSON.parse(body);
									console.log("Title: " + movieInfo.Title);
									console.log("Year: " + movieInfo.Year);
									console.log("IMDB Rating: " + movieInfo.imdbRating);
									console.log("Country: " + movieInfo.Country);
									console.log("Language: " + movieInfo.Language);
									console.log("Plot: " + movieInfo.Plot);
									console.log("Actors: " + movieInfo.Actors);
									console.log("Rotten Tomatoes Rating: " + movieInfo.tomatoesRating);
									console.log("Rotten Tomatoes URL: " + movieInfo.tomatoesURL);
									fs.appendFile('log.txt', "Title: " + movieInfo.Title + "\n" + "Year: " + movieInfo.Year + "\n" + "IMDB Rating: " + movieInfo.imdbRating + "\n" + "Country: " + movieInfo.Country + "\n" + "Language: " + movieInfo.Language + "\n" + "Plot: " + movieInfo.Plot + "\n" + "Actors: " + movieInfo.Actors + "\n" + "Rotten Tomatoes Rating: " + movieInfo.tomatoesRating + "\n" + "Rotten Tomatoes URL: " + movieInfo.tomatoesURL);
								}
									else {
									console.log(error);
								}
							});
						}
						getMovie();
						break;
				}
			}
		});
	}

switch(argOne){
	case "my-tweets":
	getTweets();
	break;
	case "spotify-this-song":
	getSong();
	break;
	case "movie-this":
	getMovie();
	break;
	case "do-what-it-says":
	getRandom();
	break;
} 