import {
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
  DataType,
  Default,
  Unique,
  AllowNull,
  BeforeCreate,
  DefaultScope,
  AfterCreate,
  Scopes,
  BeforeUpdate,
} from 'sequelize-typescript'
import { Geolocation } from './Geolocation.js'
import { Utils } from '../../service/utils.js'

const pronounsEnum: string[] = ['il', 'elle', 'iel']
const rolesEnum: string[] = ['artist', 'band', 'slayer']

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Scopes(() => ({
  withPassword: {
    attributes: { include: ['password'] },
  },
}))
@Table({
  timestamps: false,
  underscored: true,
  tableName: 'slayer',
  indexes: [
    {
      // Column name with underscores here
      fields: ['is_admin', 'is_searching', 'geolocation_id'],
    },
  ],
})
export class Slayer extends Model<Slayer> {
  @Unique
  @AllowNull(false)
  @Column
  email!: string

  @Unique
  @AllowNull(false)
  @Column
  pseudo!: string

  @AllowNull(false)
  @Column
  password!: string

  @Default(false)
  @Column
  isAdmin!: boolean

  @Column
  avatar!: string

  @Default('USER')
  @Column(DataType.ENUM({ values: rolesEnum }))
  role!: string

  @Column(DataType.ENUM({ values: pronounsEnum }))
  pronouns!: string

  @Default(false)
  @Column
  isSearching!: boolean

  @ForeignKey(() => Geolocation)
  @Column
  geolocationId?: number

  @BelongsTo(() => Geolocation)
  geolocation?: Geolocation

  @BeforeCreate
  static encryptPassword(instance: Slayer) {
    instance.password = Utils.encryptPassword(instance.getDataValue('password'))
  }

  @BeforeUpdate
  static reencryptPassword(instance: Slayer) {
    if (instance.changed('password')) {
      instance.password = Utils.encryptPassword(
        instance.getDataValue('password')
      )
    }
  }

  // Sounds ?
}
