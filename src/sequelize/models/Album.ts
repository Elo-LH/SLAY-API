import { Model, Column, Table, HasMany } from 'sequelize-typescript'
import { Sound } from './Sound.js'

@Table({
  timestamps: false,
  underscored: true,
})
export class Album extends Model<Album> {
  @Column
  name!: string

  @Column
  description?: string

  @Column
  type?: string

  @Column
  cover?: string

  @Column
  released_at?: Date

  @HasMany(() => Sound)
  sounds?: Sound[]
}
