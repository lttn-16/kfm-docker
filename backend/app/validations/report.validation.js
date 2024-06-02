// VALIDATION
const Joi = require('joi');

const options = {
	abortEarly: false, // include all errors
	allowUnknown: true, // ignore unknown props
	stripUnknown: true // remove unknown props
};

const createReportValidation = (data) => {
	const schema = Joi.object({
		duration: Joi.number().required(),
	});
	return schema.validate(data, options);
};

module.exports = {
	createReportValidation,
};
