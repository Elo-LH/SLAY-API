import { Slayer } from '../sequelize/models/Slayer.js';
// import { Geolocation } from '../sequelize/models/Geolocation.js'
const signup = async (req, res) => {
    // interface Slayer {
    //   email: string
    //   pseudo: string
    //   password: string
    //   avatar: string
    //   role: string
    //   isSearching: boolean
    //   pronouns: string
    //   geolocation: Geolocation
    // }
    // interface Geolocation {
    //   city: string
    //   latitude: number
    //   longitude: number
    // }
    const slayer = req.body;
    console.log(slayer);
    console.log(Slayer);
    // const geolocation: Geolocation = slayer.geolocation
    try {
        // Check if email not already in db
        const emailExists = await Slayer.findOne({
            where: { email: req.body.email },
        });
        if (emailExists) {
            res.status(400).json({ message: 'Email already registered' });
            return;
        }
        // Check if pseudo not already in db
        const pseudoExists = await Slayer.findOne({
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
        const newUser = await Slayer.create({
            email: req.body.email,
            pseudo: req.body.pseudo,
            password: req.body.password,
            avatar: req.body.avatar,
            role: req.body.role,
            pronouns: req.body.pronouns,
            isSearching: req.body.isSearching,
        });
        if (!newUser) {
            res.status(400).json({ message: 'Failed to create new Slayer' });
            return;
        }
        // initiate geolocation if there is one
        // if (req.body.geolocation) {
        //   const [slayerGeolocation, created] = await Geolocation.findOrCreate({
        //     where: {
        //       latitude: req.body.geolocation.latitude,
        //       longitude: req.body.geolocation.longitude,
        //     },
        //     defaults: {
        //       city: req.body.geolocation.city,
        //     },
        //   })
        //   console.log(slayerGeolocation)
        //   await newUser.addGeolocation(slayerGeolocation)
        // }
        // Response "user created"
        res.status(201).json({ message: 'Slayer created', user: newUser });
        return;
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
};
export default signup;
