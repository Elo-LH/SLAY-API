"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRotation = exports.modifyPassword = exports.modifyProfile = exports.profile = exports.slayers = exports.login = exports.signup = void 0;
const Slayer_js_1 = require("../sequelize/models/Slayer.js");
const Geolocation_js_1 = require("../sequelize/models/Geolocation.js");
const utils_js_1 = require("../service/utils.js");
const RefreshToken_js_1 = require("../sequelize/models/RefreshToken.js");
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
        // create refresh token row
        await RefreshToken_js_1.RefreshToken.create({
            slayerId: newUser.id,
            token: '',
        });
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
        const accessToken = utils_js_1.Utils.generateAccessJWT(foundSlayer.id);
        //generate Json refresh web token
        const refreshToken = utils_js_1.Utils.generateRefreshJWT(foundSlayer.id);
        if (!accessToken || !refreshToken) {
            res.status(400).json({ message: 'Could not generate tokens' });
            return;
        }
        //put refresh token in DB
        const slayerRefreshToken = await RefreshToken_js_1.RefreshToken.findByPk(foundSlayer.id);
        slayerRefreshToken.token = refreshToken;
        slayerRefreshToken.save();
        // Response "logged in"
        res.status(201).json({
            message: 'Slayer logged in',
            slayer: await Slayer_js_1.Slayer.findByPk(foundSlayer.id.toString(), {
                include: Geolocation_js_1.Geolocation,
            }),
            accessToken: accessToken,
            refreshToken: refreshToken,
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
const profile = async (req, res) => {
    try {
        // check token
        console.log(req.body.token);
        console.log(req.body);
        const slayerId = req.body.token.id;
        if (!slayerId) {
            res.status(400).json({ message: 'Could not retrieve token' });
            return;
        }
        // else return complete info of slayer logged in from token id
        const result = await Slayer_js_1.Slayer.findByPk(slayerId.toString(), {
            include: Geolocation_js_1.Geolocation,
        });
        res.status(201).json({ message: 'Slayer profile', user: result });
        return;
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
};
exports.profile = profile;
const modifyProfile = async (req, res) => {
    try {
        // check token
        console.log(req.body.token);
        console.log(req.body);
        const slayerId = req.body.token.id;
        if (!slayerId) {
            res.status(400).json({ message: 'Could not retrieve token' });
            return;
        }
        // get Slayer by id
        let slayer = await Slayer_js_1.Slayer.findByPk(slayerId.toString(), {
            include: Geolocation_js_1.Geolocation,
        });
        // initiate geolocation if there is one
        if (req.body.geolocation) {
            await Geolocation_js_1.Geolocation.findOrCreate({
                where: {
                    latitude: req.body.geolocation.latitude,
                    longitude: req.body.geolocation.longitude,
                    city: req.body.geolocation.city,
                },
            }).then(([slayerGeolocation, created]) => slayer.$set('geolocation', slayerGeolocation));
        }
        // update slayer infos
        slayer.update({
            email: req.body.email,
            pseudo: req.body.pseudo,
            avatar: req.body.avatar,
            pronouns: req.body.pronouns,
            isSearching: req.body.isSearching,
        });
        await slayer.save();
        //apply changes
        res.status(201).json({ message: 'Slayer profile updated', user: slayer });
        return;
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
};
exports.modifyProfile = modifyProfile;
const modifyPassword = async (req, res) => {
    try {
        // check token
        console.log(req.body.token);
        console.log(req.body);
        const slayerId = req.body.token.id;
        if (!slayerId) {
            res.status(400).json({ message: 'Could not retrieve token' });
            return;
        }
        // get Slayer by id
        let slayer = await Slayer_js_1.Slayer.scope('withPassword').findByPk(slayerId.toString());
        //verify complexity of newPasswordf ????
        //verify oldPassword
        // Check if password matches DB
        const isPasswordMatching = utils_js_1.Utils.verifyPassword(req.body.oldPassword, slayer.password);
        if (!isPasswordMatching) {
            res.status(400).json({ message: 'Wrong password' });
            return;
        }
        //generate Json web token
        const accessToken = utils_js_1.Utils.generateAccessJWT(slayer.id);
        //generate Json refresh web token
        const refreshToken = utils_js_1.Utils.generateRefreshJWT(slayer.id);
        if (!accessToken || !refreshToken) {
            res.status(400).json({ message: 'Could not generate tokens' });
            return;
        }
        //put refresh token in DB
        const slayerRefreshToken = await RefreshToken_js_1.RefreshToken.findByPk(slayer.id);
        slayerRefreshToken.token = refreshToken;
        slayerRefreshToken.save();
        // update slayer password
        await slayer.update({
            password: req.body.newPassword,
        });
        await slayer.save();
        //apply changes
        res.status(201).json({
            message: 'Slayer password updated',
            user: slayer,
            accessToken: accessToken,
            refreshToken: refreshToken,
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
exports.modifyPassword = modifyPassword;
const tokenRotation = async (req, res) => {
    try {
        //get refresh token value
        const oldRefreshToken = req.header('Authorization')?.replace('Bearer ', '');
        if (!oldRefreshToken) {
            res.status(400).json({ message: 'Could not retrieve token' });
            return;
        }
        const decoded = utils_js_1.Utils.verifyRefreshJWT(oldRefreshToken);
        // search this token in db
        const slayerRefreshToken = await RefreshToken_js_1.RefreshToken.findByPk(decoded.id);
        if (slayerRefreshToken.token !== oldRefreshToken) {
            //Logout user !!!
            res.status(400).json({ message: 'Wrong refresh token' });
            return;
        }
        //generate Json refresh web token
        const newRefreshToken = utils_js_1.Utils.generateRefreshJWT(decoded.id);
        //put refresh token in DB
        slayerRefreshToken.token = newRefreshToken;
        slayerRefreshToken.save();
        // generate a new access token
        const newAccessToken = utils_js_1.Utils.generateAccessJWT(decoded.id);
        // Response "user created"
        res.status(201).json({
            message: 'Token rotation success',
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
        return;
        return;
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
};
exports.tokenRotation = tokenRotation;
// delete tokens when user logs out
// export const signout = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const result = await Slayer.findAll({ include: Geolocation })
//     // Response "user created"
//     res.status(201).json({ message: 'Slayer created', user: result })
//     return
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error(error)
//     res.status(500).json({ message: 'Internal Server Error' })
//     return
//   }
// }
