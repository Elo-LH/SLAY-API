import {
  Model,
  Column,
  Table,
  HasMany,
  AllowNull,
  Scopes,
} from 'sequelize-typescript'
import { Slayer } from './Slayer.js'
// import { SlayerSearch } from './SlayerSearch.js'

@Scopes(() => ({
  slayers: {
    include: [
      {
        model: Slayer,
        through: { attributes: [] },
      },
    ],
  },
  full: {
    include: [
      {
        model: Slayer,
        through: { attributes: [] },
      },
    ],
  },
}))
@Table({
  tableName: 'geolocation',
  timestamps: false,
  underscored: true,
})
export class Geolocation extends Model<Geolocation> {
  @AllowNull(false)
  @Column
  city!: string

  @AllowNull(false)
  @Column
  latitude!: number

  @AllowNull(false)
  @Column
  longitude!: number

  @HasMany(() => Slayer)
  slayers?: Slayer[]

  // @HasMany(() => SlayerSearch)
  // slayerSearchs?: SlayerSearch[]
}
