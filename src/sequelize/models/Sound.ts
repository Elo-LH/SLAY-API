import {
  Scopes,
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

@Scopes(() => ({
  album_id: {
    include: [
      {
        model: Album,
        through: { attributes: [] },
      },
    ],
  },
  album: {
    include: [
      {
        model: Album,
        through: { attributes: [] },
      },
    ],
  },
  performers: {
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
        model: Album,
        through: { attributes: [] },
      },
      {
        model: Slayer,
        through: { attributes: [] },
      },
    ],
  },
}))
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
