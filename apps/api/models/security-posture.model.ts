import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Client } from './client.model';

@ObjectType()
@Table
export class SecurityPosture extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: Client,
      key: 'clientId',
    },
  })
  @Field(() => ID)
  clientId: string;

  @Column
  @Field()
  lastScanDate: Date;

  @Column({ type: DataType.INTEGER, allowNull: true })
  @Field(type => Int)
  threatsDetected: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  @Field(type => Int)
  riskScore: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  @Field(type => Int)
  vulnerabilitiesFound: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  @Field(type => Int)
  incidentsReported: number;

  @Column({ type: DataType.DATE, allowNull: true })
  @Field()
  reportDate: Date;
}
