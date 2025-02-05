import * as bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'

export class Utils {
  /**
   * Return a random int, used by `utils.uid()`
   *
   * @param {Number} min
   * @param {Number} max
   * @return {Number}
   */
  public static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  public static encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }
  public static verifyPassword(password: string, dbPassword: string): boolean {
    return bcrypt.compareSync(password, dbPassword)
  }
  public static generateAccessJWT(id: string): string | undefined {
    if (process.env.JWT_ACCESS) {
      return jwt.sign({ id: id }, process.env.JWT_ACCESS, {
        expiresIn: '30 minutes',
      })
    }
  }
  public static generateRefreshJWT(id: string): string | undefined {
    if (process.env.JWT_REFRESH) {
      return jwt.sign({ id: id }, process.env.JWT_REFRESH, {
        expiresIn: '7 days',
      })
    }
  }
  public static verifyRefreshJWT(
    refreshToken: string
  ): string | JwtPayload | undefined {
    if (process.env.JWT_REFRESH) {
      return jwt.verify(refreshToken, process.env.JWT_REFRESH)
    }
  }
}
