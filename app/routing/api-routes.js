// Pull in required dependencies
var path = require('path');

// Import the list of friend entries
var friends = require('../data/friends.js');

// Export API routes
module.exports = function(app) {

	// Total list of friend entries
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {
		
		// Capture the user input object
		var userInput = req.body;
		console.log('userInput = ' + JSON.stringify(userInput));

		var userResponses = userInput.scores;
		console.log('userResponses = ' + userResponses);

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
            // Finding the Differences
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
				console.log(diff);
			}


			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
				console.log("matchImage= " + matchImage),
				console.log("matchName= " + matchName)
			}
		}

		// Add new user
		friends.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};