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
		var userTotalScore = userResponses.reduce((sum, next) => sum + parseInt(next), 0)
            for (var i = 0; i < friends.length; i++) {
                var currentFriendTotal = friends[i].scores.reduce((sum, next) => sum + parseInt(next), 0)
				var difference = Math.abs(userTotalScore - currentFriendTotal)
				console.log(difference);
                if (difference < totalDifference) {
                    totalDifference = difference;
                    matchName = friends[i].name;
                    matchImage = friends[i].photo;
                }
        }

		// Add new user
		friends.push(userInput);
		console.log(matchImage);
		console.log(matchName);
		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};