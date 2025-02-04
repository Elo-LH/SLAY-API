import { Request, Response } from 'express'
import { Slayer } from '../sequelize/models/Slayer.js'
import { Geolocation } from '../sequelize/models/Geolocation.js'
import { Utils } from '../service/utils.js'
import { RefreshToken } from '../sequelize/models/RefreshToken.js'
import { JwtPayload } from 'jsonwebtoken'
import { access } from 'fs'

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
    // create refresh token row
    await RefreshToken.create({
      slayerId: newUser.id,
      token: '',
    })
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
      slayer: await Slayer.findByPk(newUser.id, { include: Geolocation }),
    })
    return
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if email not already in db
    const foundSlayer: Slayer | null = await Slayer.scope(
      'withPassword'
    ).findOne({
      where: { email: req.body.email },
    })
    if (!foundSlayer) {
      res.status(400).json({ message: 'No Slayer found with this email' })
      return
    }
    // Check if password matches DB
    const isPasswordMatching = Utils.verifyPassword(
      req.body.password,
      foundSlayer.password
    )
    if (!isPasswordMatching) {
      res.status(400).json({ message: 'Wrong password' })
      return
    }

    //generate Json web token
    const accessToken = Utils.generateAccessJWT(foundSlayer.id)
    //generate Json refresh web token
    const refreshToken = Utils.generateRefreshJWT(foundSlayer.id)
    if (!accessToken || !refreshToken) {
      res.status(400).json({ message: 'Could not generate tokens' })
      return
    }

    //put refresh token in DB
    const slayerRefreshToken = await RefreshToken.findByPk(foundSlayer.id)
    slayerRefreshToken.token = refreshToken
    slayerRefreshToken.save()

    // Response "logged in"

    res.status(201).json({
      message: 'Slayer logged in',
      slayer: await Slayer.findByPk(foundSlayer.id.toString(), {
        include: Geolocation,
      }),
      accessToken: accessToken,
      refreshToken: refreshToken,
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

export const profile = async (req: Request, res: Response): Promise<void> => {
  try {
    // check token
    console.log(req.body.token)
    console.log(req.body)
    const slayerId = req.body.token.id
    if (!slayerId) {
      res.status(400).json({ message: 'Could not retrieve token' })
      return
    }
    // else return complete info of slayer logged in from token id
    const result = await Slayer.findByPk(slayerId.toString(), {
      include: Geolocation,
    })
    res.status(201).json({ message: 'Slayer profile', user: result })
    return
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}

export const modifyProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // check token
    console.log(req.body.token)
    console.log(req.body)
    const slayerId = req.body.token.id
    if (!slayerId) {
      res.status(400).json({ message: 'Could not retrieve token' })
      return
    }
    // get Slayer by id
    let slayer = await Slayer.findByPk(slayerId.toString(), {
      include: Geolocation,
    })

    // initiate geolocation if there is one
    if (req.body.geolocation) {
      await Geolocation.findOrCreate({
        where: {
          latitude: req.body.geolocation.latitude,
          longitude: req.body.geolocation.longitude,
          city: req.body.geolocation.city,
        },
      }).then(([slayerGeolocation, created]) =>
        slayer.$set('geolocation', slayerGeolocation)
      )
    }

    // update slayer infos
    slayer.update({
      email: req.body.email,
      pseudo: req.body.pseudo,
      avatar: req.body.avatar,
      pronouns: req.body.pronouns,
      isSearching: req.body.isSearching,
    })
    await slayer.save()

    //apply changes
    res.status(201).json({ message: 'Slayer profile updated', user: slayer })
    return
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}

export const tokenRotation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //get refresh token value
    const oldRefreshToken = req.header('Authorization')?.replace('Bearer ', '')

    if (!oldRefreshToken) {
      res.status(400).json({ message: 'Could not retrieve token' })
      return
    }
    const decoded = Utils.verifyRefreshJWT(oldRefreshToken) as JwtPayload

    // search this token in db
    const slayerRefreshToken = await RefreshToken.findByPk(decoded.id as number)
    if (slayerRefreshToken.token !== oldRefreshToken) {
      //Logout user !!!
      res.status(400).json({ message: 'Wrong refresh token' })
      return
    }

    //generate Json refresh web token
    const newRefreshToken = Utils.generateRefreshJWT(decoded.id)

    //put refresh token in DB
    slayerRefreshToken.token = newRefreshToken
    slayerRefreshToken.save()

    // generate a new access token

    const newAccessToken = Utils.generateAccessJWT(decoded.id)

    // Response "user created"
    res.status(201).json({
      message: 'Token rotation success',
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    })
    return
    return
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}

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
