import { Resolver, Query, Args } from '@nestjs/graphql';
import { IncidentService } from './incident.service';
import { Incident } from '../../models/incident.model';

@Resolver(() => Incident)
export class IncidentResolver {
  constructor(private readonly incidentService: IncidentService) {}

  @Query(() => [Incident])
  async getIncidentsByClientId(
    @Args('clientId') clientId: string,
  ): Promise<Incident[]> {
    return await this.incidentService.findByClientId(clientId);
  }
}
