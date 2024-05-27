const { signAccessToken } = require("../helpers/jwt_helpers");
const db = require("../models");
const { registerValidation, loginValidation } = require("../validations/user.validation");
const UserModel = db.users;
const Op = db.Sequelize.Op;
const CryptoJS = require('crypto-js');


exports.signup = async (req, res) => {
    const {
        email, password, first_name, last_name
    } = req.body;
    const response = {
        statusCode: 422,
        message: 'Register failed!',
        content: {
            email,
            password,
            first_name,
            last_name
        }
    };
    try {
        console.log(`[USER] >> [SIGNUP] payload ${JSON.stringify(req.body)}`);
        // LETS VALIDATE THE DATA BEFORE WE A USER
        const { error } = registerValidation(req.body);

        if (error) {
            console.log(`[ERROR USER] [SIGNUP] ${JSON.stringify(error)}`);
            response.message = error.details[0].message;
            return res.status(response.statusCode).send(response);
        }

        // Checking if the user is already in the database
        const emailExist = await UserModel.findOne({ where: { email } });
        if (emailExist) {
            console.log('[ERROR USER] [SIGNUP] Email already exists!');
            response.message = 'Email already exists!';
            return res.status(response.statusCode).send(response);
        }

        // Hash passwords
        const hashedPassword = await CryptoJS.SHA256(
            password + process.env.HASH_PASS_USER
        ).toString(CryptoJS.enc.Hex);

        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
        };

        await UserModel.create(user);
        response.statusCode = 200;
        response.message = 'Register successfully!';
        console.log(`[USER] >> [SIGNUP] response ${JSON.stringify(response)}`);
        return res.status(response.statusCode).send(response);
    } catch (err) {
        console.log(`[ERROR USER] [SIGNUP] ${JSON.stringify(err.message)}`);
        response.statusCode = 500;
        response.message = err.message || 'Internal Server Error';
        return res.status(response.statusCode).send(response);
    }
};


exports.signin = async (req, res) => {
    const { email, password } = req.body;
    let response = {
        statusCode: 422,
        message: 'Incorrect email or password!',
        content: {
            email,
            password
        }
    };
    try {
        console.log(`[USER] >> [SIGN IN] payload ${JSON.stringify(req.body)}`);
        // LETS VALIDATE THE DATA BEFORE WE A USER
        const { error } = loginValidation(req.body);

        if (error) {
            console.log(`[ERROR USER] [SIGN IN] ${JSON.stringify(error)}`);
            response.message = error.details[0].message;
            return res.status(response.statusCode).send(response);
        }

        // Checking if the email exist
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            console.log('[ERROR USER] [SIGN IN] Email is wrong!');
            response.message = 'Email is wrong!';
            return res.status(response.statusCode).send(response);
        }

        // PASSWORD IS CORRECT
        const hashedPassword = await CryptoJS.SHA256(
            password + process.env.HASH_PASS_USER
        ).toString(CryptoJS.enc.Hex);
        if (hashedPassword !== user.password) {
            console.log('[ERROR USER] [SIGN IN] Invalid password');
            response.message = 'Invalid password';
            return res.status(response.statusCode).send(response);
        }

        // Create and assign a token
        const dataUserInternal = {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
        }
        const accessToken = await signAccessToken(
            user.id.toString(),
            dataUserInternal
        );
        // var refreshToken = await signRefreshToken(String(user._id));

        response = {
            statusCode: 200,
            message: 'Login successfully!',
            content: {
                id: user.id,
                ...dataUserInternal,
                accessToken
            }
        };
        console.log(`[USER] >> [SIGN IN] response ${JSON.stringify(response)}`);
        return res.status(response.statusCode).send(response);
    } catch (err) {
        console.log(`[ERROR USER] [SIGN IN] ${JSON.stringify(err.message)}`);
        response.statusCode = 500;
        response.message = err.message || 'Internal Server Error';
        return res.status(response.statusCode).send(response);
    }
};