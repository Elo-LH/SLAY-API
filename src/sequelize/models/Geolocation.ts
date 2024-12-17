import { Model, Column, Table, HasMany, AllowNull } from 'sequelize-typescript'
import { Slayer } from './Slayer.js'
// import { SlayerSearch } from './SlayerSearch.js'

@Table({
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
