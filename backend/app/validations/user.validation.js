// VALIDATION
const Joi = require('joi');

const options = {
	abortEarly: false, // include all errors
	allowUnknown: true, // ignore unknown props
	stripUnknown: true // remove unknown props
};
// Register Validation
const registerValidation = (data) => {
	const schema = Joi.object({
		first_name: Joi.string().min(1).max(30).required(),

        last_name: Joi.string().min(1).max(30).required(),

		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
			.required(),

		password: Joi.string()
			.pattern(/^[a-zA-Z0-9]{3,30}$/)
			.required(),
	});
	return schema.validate(data, options);
};

// Login Validation
const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
			.required(),

        password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required()
	});
	return schema.validate(data, options);
};

module.exports = {
	registerValidation,
	loginValidation
};
