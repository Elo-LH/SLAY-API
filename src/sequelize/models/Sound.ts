import {
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript'
import { Album } from './Album.js'
import { Slayer } from './Slayer.js'
import { SlayerSound } from './SlayerSound.js'

@Table({
  timestamps: false,
  underscored: true,
})
export class Sound extends Model<Sound> {
  @Column
  title!: string

  @Column
  audio!: string

  @ForeignKey(() => Album)
  @Column
  album_id?: number

  @BelongsTo(() => Album)
  album?: Album

  @BelongsToMany(() => Slayer, () => SlayerSound)
  performers?: Slayer[]
}
