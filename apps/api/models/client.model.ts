import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Client extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  clientId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  organisationName: string;

  @Column({
    type: DataType.STRING,
  })
  contactEmail: string;
}
