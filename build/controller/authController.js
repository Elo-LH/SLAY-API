"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slayers = exports.signup = void 0;
const Slayer_js_1 = require("../sequelize/models/Slayer.js");
const Geolocation_js_1 = require("../sequelize/models/Geolocation.js");
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
            user: await Slayer_js_1.Slayer.findByPk(newUser.id, { include: Geolocation_js_1.Geolocation }),
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
