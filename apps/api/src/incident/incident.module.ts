import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentResolver } from './incident.resolver';
import { IncidentController } from './incident.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Incident } from '../../models/incident.model';

@Module({
  imports: [SequelizeModule.forFeature([Incident])],
  controllers: [IncidentController],
  providers: [IncidentResolver, IncidentService],
})
export class IncidentModule {}
