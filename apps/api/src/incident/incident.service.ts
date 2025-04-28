import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Incident } from '../../models/incident.model';

@Injectable()
export class IncidentService {
  constructor(
    @InjectModel(Incident)
    private readonly incidentModel: typeof Incident,
  ) {}

  async findByClientId(clientId: string): Promise<Incident[]> {
    return this.incidentModel.findAll({ where: { clientId } });
  }
}
