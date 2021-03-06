const jwt = require('jsonwebtoken');
let express = require('express');
let router = express.Router();

router.verifyToken = (req, res, next) => {
	const token = req.headers.authenticate || req.headers['authenticate'];
	if (!token)
		return res.status(403).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
		if (err)
			return res
				.status(501)
				.send({ auth: false, message: 'Failed to authenticate token.' });

		// if everything good, save to request for use in other routes
		req.userId = decoded.id;
		next();
	});
};

module.exports = router;
