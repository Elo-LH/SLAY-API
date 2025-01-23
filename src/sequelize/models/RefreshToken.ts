import {
  Model,
  Column,
  Table,
  AllowNull,
  PrimaryKey,
} from 'sequelize-typescript'

@Table({
  tableName: 'refresh_token',
  timestamps: false,
  underscored: true,
  indexes: [
    {
      // Column name with underscores here
      fields: ['slayer_id'],
    },
  ],
})
export class RefreshToken extends Model<RefreshToken> {
  @AllowNull(false)
  @PrimaryKey
  @Column
  slayerId!: number

  @AllowNull(false)
  @Column
  token!: string
}
