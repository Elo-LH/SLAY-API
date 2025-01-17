"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slayers = exports.login = exports.signup = void 0;
const Slayer_js_1 = require("../sequelize/models/Slayer.js");
const Geolocation_js_1 = require("../sequelize/models/Geolocation.js");
const utils_js_1 = require("../service/utils.js");
const signup = async (req, res) => {
    const slayer = req.body;
    // console.log(slayer)
    // console.log(Slayer)
    // const geolocation: Geolocation = slayer.geolocation
    try {
        // Check if email not already in db
        const emailExists = await Slayer_js_1.Slayer.findOne({
            where: { email: req.body.email },
        });
        if (emailExists) {
            res.status(400).json({ message: 'Email already registered' });
            return;
        }
        // Check if pseudo not already in db
        const pseudoExists = await Slayer_js_1.Slayer.findOne({
            where: { pseudo: req.body.pseudo },
        });
        if (pseudoExists) {
            res.status(400).json({ message: 'Pseudo already used' });
            return;
        }
        //verify difficulty and encrypt password
        // check slayer role
        if (req.body.role === 'artist') {
            //create an artist
        }
        if (req.body.role === 'band') {
            //create a band
        }
        // else by default : Create a user
        console.log(req.body);
        //create user
        const newUser = await Slayer_js_1.Slayer.create(req.body);
        if (!newUser) {
            res.status(400).json({ message: 'Failed to create new Slayer' });
            return;
        }
        // initiate geolocation if there is one
        if (req.body.geolocation) {
            await Geolocation_js_1.Geolocation.findOrCreate({
                where: {
                    latitude: req.body.geolocation.latitude,
                    longitude: req.body.geolocation.longitude,
                    city: req.body.geolocation.city,
                },
            }).then(([slayerGeolocation, created]) => newUser.$set('geolocation', slayerGeolocation));
        }
        // Response "user created"
        res.status(201).json({
            message: 'Slayer created',
            slayer: await Slayer_js_1.Slayer.findByPk(newUser.id, { include: Geolocation_js_1.Geolocation }),
        });
        return;
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
};
exports.signup = signup;
const login = async (req, res) => {
    // const slayer: Slayer = req.body
    // console.log(slayer)
    // console.log(Slayer)
    // const geolocation: Geolocation = slayer.geolocation
    try {
        // Check if email not already in db
        const foundSlayer = await Slayer_js_1.Slayer.scope('withPassword').findOne({
            where: { email: req.body.email },
        });
        if (!foundSlayer) {
            res.status(400).json({ message: 'No Slayer found with this email' });
            return;
        }
        // Check if password matches DB
        const isPasswordMatching = utils_js_1.Utils.verifyPassword(req.body.password, foundSlayer.password);
        if (!isPasswordMatching) {
            res.status(400).json({ message: 'Wrong password' });
            return;
        }
        //generate Json web token
        const token = utils_js_1.Utils.generateJWT(foundSlayer.id);
        // Response "logged in"
        res.status(201).json({
            message: 'Slayer logged in',
            slayer: await Slayer_js_1.Slayer.findByPk(foundSlayer.id.toString(), {
                include: Geolocation_js_1.Geolocation,
            }),
            token: token,
        });
        return;
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
};
exports.login = login;
const slayers = async (req, res) => {
    try {
        const result = await Slayer_js_1.Slayer.findAll({ include: Geolocation_js_1.Geolocation });
        // Response "user created"
        res.status(201).json({ message: 'Slayer created', user: result });
        return;
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
};
exports.slayers = slayers;
