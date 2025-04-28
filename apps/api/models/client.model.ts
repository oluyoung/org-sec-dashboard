import { ObjectType, Field } from '@nestjs/graphql';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@ObjectType()
@Table
export class Client extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @Field()
  clientId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Field({ nullable: false })
  organisationName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Field({ nullable: false })
  contactEmail: string;
}
