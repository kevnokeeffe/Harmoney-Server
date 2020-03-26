const User = require('../../models/users-models/user');

exports.verify = function(request, response) {
	let user = {};

	// Load user model
	User.findById(request.params.id, function(err, doc) {
		if (err || !doc) {
			return die('User not found for this ID.');
		}

		// If we find the user, let's validate the token they entered
		user = doc;
		user.verifyAuthyToken(request.body.code, postVerify);
	});

	// Handle verification response
	function postVerify(err) {
		if (err) {
			return die('The token you entered was invalid - please retry.');
		}

		// If the token was valid, flip the bit to validate the user account
		user.verified = true;
		user.save(postSave);
	}

	// after we save the user, handle sending a confirmation
	function postSave(err) {
		if (err) {
			return die('There was a problem validating your account '
                + '- please enter your token again.');
		}

		// Send confirmation text message
		const message = 'You did it! Signup complete :)';
		user.sendMessage(message, function() {
			// show success page
			request.send('successes', message);
			response.redirect(`/users/${user._id}`);
		}, function(err) {
			request.flash('errors', 'You are signed up, but '
              + 'we could not send you a message. Our bad :(');
		});
	}

	// respond with an error
	function die(message) {
		request.flash('errors', message);
		response.redirect('/users/'+request.params.id+'/verify');
	}
};

// Resend a code if it was not received
exports.resend = function(request, response) {
	// Load user model
	User.findById(request.params.id, function(err, user) {
		if (err || !user) {
			return die('User not found for this ID.');
		}

		// If we find the user, let's send them a new code
		user.sendAuthyToken(postSend);
	});

	// Handle send code response
	function postSend(err) {
		if (err) {
			return die('There was a problem sending you the code - please '
                + 'retry.');
		}

		request.flash('successes', 'Code re-sent!');
		response.redirect('/users/'+request.params.id+'/verify');
	}

	// respond with an error
	function die(message) {
		request.flash('errors', message);
		response.redirect('/users/'+request.params.id+'/verify');
	}
};

// Show details about the user
exports.showUser = function(request, response, next) {
	// Load user model
	User.findById(request.params.id, function(err, user) {
		if (err || !user) {
			// 404
			return next();
		}

		response.render('users/show', {
			title: 'Hi there ' + user.fullName + '!',
			user: user,
			// any errors
			errors: request.flash('errors'),
			// any success messages
			successes: request.flash('successes'),
		});
	});
};