import { Request, Response } from 'express'
import { Slayer } from '../sequelize/models/Slayer.js'
import { Geolocation } from '../sequelize/models/Geolocation.js'

export const signup = async (req: Request, res: Response): Promise<void> => {
  const slayer: Slayer = req.body
  // console.log(slayer)
  // console.log(Slayer)
  // const geolocation: Geolocation = slayer.geolocation

  try {
    // Check if email not already in db
    const emailExists: Slayer | null = await Slayer.findOne({
      where: { email: req.body.email },
    })
    if (emailExists) {
      res.status(400).json({ message: 'Email already registered' })
      return
    }
    // Check if pseudo not already in db
    const pseudoExists = await Slayer.findOne({
      where: { pseudo: req.body.pseudo },
    })
    if (pseudoExists) {
      res.status(400).json({ message: 'Pseudo already used' })
      return
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
    console.log(req.body)

    //create user
    const newUser = await Slayer.create(req.body)
    if (!newUser) {
      res.status(400).json({ message: 'Failed to create new Slayer' })
      return
    }
    // initiate geolocation if there is one

    if (req.body.geolocation) {
      await Geolocation.findOrCreate({
        where: {
          latitude: req.body.geolocation.latitude,
          longitude: req.body.geolocation.longitude,
          city: req.body.geolocation.city,
        },
      }).then(([slayerGeolocation, created]) =>
        newUser.$set('geolocation', slayerGeolocation)
      )
    }
    // Response "user created"
    res.status(201).json({
      message: 'Slayer created',
      user: await Slayer.findByPk(newUser.id, { include: Geolocation }),
    })
    return
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}

export const slayers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Slayer.findAll({ include: Geolocation })
    // Response "user created"
    res.status(201).json({ message: 'Slayer created', user: result })
    return
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
