import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { ObjectType, Field } from '@nestjs/graphql';
import { Client } from './client.model';

@ObjectType()
@Table
export class Incident extends Model {
  @ForeignKey(() => Client)
  @Column({ type: DataType.UUID })
  @Field()
  clientId: string;

  @Column({ allowNull: false })
  @Field({ nullable: false })
  title: string;

  @Column({ allowNull: false })
  @Field({ nullable: false })
  description: string;

  @Column({ allowNull: false, defaultValue: 'open' })
  @Field({ nullable: false })
  status: string;

  @Column({ allowNull: false })
  @Field({ nullable: false })
  severity: string;

  @Column({ allowNull: false, type: DataType.DATE })
  @Field()
  reportedAt: Date;
}
