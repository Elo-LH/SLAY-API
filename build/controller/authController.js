import sequelize from '../sequelize/config/database';
import initModels from '../sequelize/models/init-models';
var models = initModels(sequelize);
const Slayer = models.Slayer;
const Geolocation = models.Geolocation;
const signup = async (req, res) => {
    const slayer = req.body;
    const geolocation = slayer.geolocation;
    try {
        // Check if email not already in db
        const emailExists = await Slayer.findOne({
            where: { email: slayer.email },
        });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        // Check if pseudo not already in db
        const pseudoExists = await Slayer.findOne({
            where: { pseudo: slayer.pseudo },
        });
        if (pseudoExists) {
            return res.status(400).json({ message: 'Pseudo already used' });
        }
        //verify difficulty and encrypt password
        // check slayer role
        if (slayer.role === 'ARTIST') {
            //create an artist
        }
        if (slayer.role === 'BAND') {
            //create a band
        }
        // else by default : Create a user
        console.log(slayer);
        //create user
        const newUser = await Slayer.create({
            email: slayer.email,
            pseudo: slayer.pseudo,
            password: slayer.password,
            avatar: slayer.avatar,
            role: slayer.role,
            pronouns: slayer.pronouns,
            isSearching: slayer.isSearching,
        });
        if (!newUser) {
            return res.status(400).json({ message: 'Failed to create new Slayer' });
        }
        // initiate geolocation if there is one
        if (geolocation) {
            const [slayerGeolocation, created] = await Geolocation.findOrCreate({
                where: {
                    latitude: geolocation.latitude,
                    longitude: geolocation.longitude,
                },
                defaults: {
                    city: geolocation.city,
                },
            });
            console.log(slayerGeolocation);
            await newUser.addGeolocation(slayerGeolocation);
        }
        // Response "user created"
        return res.status(201).json({ message: 'Slayer created', user: newUser });
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
export default signup;
