const sequelize = require('../sequelize/config/database')
var initModels = require('../sequelize/models/init-models')
var models = initModels(sequelize)
const Slayer = models.Slayer
const Geolocation = models.Geolocation
const signup = async (req, res, next) => {
  const body = req.body

  try {
    // Check if email not already in db
    const emailExists = await Slayer.findOne({
      where: { email: body.email },
    })
    if (emailExists) {
      return res.status(400).json({ message: 'Email already registered' })
    }
    // Check if pseudo not already in db
    const pseudoExists = await Slayer.findOne({
      where: { pseudo: body.pseudo },
    })
    if (pseudoExists) {
      return res.status(400).json({ message: 'Pseudo already used' })
    }
    //verify difficulty and encrypt password

    // check slayer role
    if (body.role === 'ARTIST') {
      //create an artist
    }
    if (body.role === 'BAND') {
      //create a band
    }
    // else by default : Create a user
    console.log(body)

    //create user
    const newUser = await Slayer.create({
      email: body.email,
      pseudo: body.pseudo,
      password: body.password,
      avatar: body.avatar,
      role: body.role,
      pronouns: body.pronouns,
      isSearching: body.isSearching,
    })
    if (!newUser) {
      return res.status(400).json({ message: 'Failed to create new Slayer' })
    }
    // initiate geolocation if there is one
    if (body.geolocation) {
      const [slayerGeolocation, created] = await Geolocation.findOrCreate({
        where: {
          latitude: body.geolocation.latitude,
          longitude: body.geolocation.longitude,
        },
        defaults: {
          city: body.geolocation.city,
        },
      })
      console.log(slayerGeolocation)
      await newUser.addGeolocation(slayerGeolocation)
    }
    // Response "user created"
    return res.status(201).json({ message: 'Slayer created', user: newUser })
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = { signup }
