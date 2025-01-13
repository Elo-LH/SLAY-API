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
  Scopes,
} from 'sequelize-typescript'
import { Geolocation } from './Geolocation.js'

const pronounsEnum: string[] = ['il', 'elle', 'iel']
const rolesEnum: string[] = ['artist', 'band', 'slayer']

@Scopes(() => ({
  geolocation: {
    include: [
      {
        model: Geolocation,
        through: { attributes: [] },
      },
    ],
  },
  full: {
    include: [
      {
        model: Geolocation,
        through: { attributes: [] },
      },
    ],
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

  // Sounds ?
}
