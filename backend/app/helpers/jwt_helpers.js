const jwt = require('jsonwebtoken');

module.exports = {
	signAccessToken: (userId, payload) => new Promise((resolve, reject) => {
		const secret = process.env.ACCESS_TOKEN_SECRET;
		const options = {
			expiresIn: '7d',
			audience: userId
		};
		jwt.sign(payload, secret, options, (err, token) => {
			if (err) {
				console.log(err.message);
				reject(err);
			}
			resolve(token);
		});
	}),

	verifyAccessToken: (req, res, next) => {
		console.log(`[VERIFY ACCESS TOKEN] >> [PAYLOAD] ${JSON.stringify(req.headers)}`);
		let token = req.headers.authorization;
		if (!token) return res.status(401).send('Access Denied');
		[, token] = token.split(' ');
		if (token === 'undefined') return res.status(401).send('Access Denied');

		try {
			const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
			req.user = verified;
		} catch (err) {
			console.log(`[VERIFY ACCESS TOKEN] >> [ERROR] ${JSON.stringify(err)}`);
			if (err.name === 'JsonWebTokenError') {
				return res.status(401).send('Unauthorized');
			}
			if (err.name === 'TokenExpiredError') {
				return res.status(401).send(err.message || 'jwt expired');
			}
			return res.status(400).send('Invalid Token');
			// res.send({ statusCode: 400, message: err });
		}
		return next();
    }
};
