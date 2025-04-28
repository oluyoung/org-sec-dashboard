import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Client } from './client.model';

@ObjectType()
@Table
export class SecurityPosture extends Model {
  @ForeignKey(() => Client)
  @Column({ type: DataType.UUID })
  @Field()
  clientId: string;

  @Column
  @Field()
  lastScanDate: Date;

  @Column({ type: DataType.INTEGER })
  @Field(() => Int)
  threatsDetected: number;

  @Column({ type: DataType.INTEGER })
  @Field(() => Int)
  riskScore: number;

  @Column({ type: DataType.INTEGER })
  @Field(() => Int)
  vulnerabilitiesFound: number;

  @Column({ type: DataType.INTEGER })
  @Field(() => Int)
  incidentsReported: number;

  @Column({ type: DataType.DATE })
  @Field()
  reportDate: Date;
}
