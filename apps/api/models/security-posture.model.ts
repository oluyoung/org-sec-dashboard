import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class SecurityPosture extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  clientId: string;

  @Column
  lastScanDate: Date;

  @Column
  threatsDetected: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  riskScore: number;

  @Column({ type: DataType.DATE, allowNull: false })
  reportDate: Date;
}
