import { Resolver, Query, Args } from '@nestjs/graphql';
import { SecurityPostureService } from './security-posture.service';
import { SecurityPosture } from '../../models/security-posture.model';

@Resolver(() => SecurityPosture)
export class SecurityPostureResolver {
  constructor(private readonly postureService: SecurityPostureService) {}

  @Query(() => SecurityPosture, { nullable: true })
  async getSecurityPosture(
    @Args('clientId') clientId: string,
  ): Promise<SecurityPosture> {
    return await this.postureService.findByClientId(clientId);
  }
}
