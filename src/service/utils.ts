import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
  public static generateJWT(id: string): string | undefined {
    if (process.env.JWT_ACCESS) {
      return jwt.sign({ id: id }, process.env.JWT_ACCESS, {
        expiresIn: '2 days',
      })
    }
  }
}
