import {
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript'
import { Sound } from './Sound.js'
import { Slayer } from './Slayer.js'

@Table({
  timestamps: false,
  underscored: true,
})
export class SlayerSound extends Model<SlayerSound> {
  @ForeignKey(() => Slayer)
  @Column
  slayer_id!: number

  @ForeignKey(() => Sound)
  @Column
  sound_id!: number
}
