import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// import { CreateSecurityPostureDto } from './dto/create-security-posture.dto';
// import { UpdateSecurityPostureDto } from './dto/update-security-posture.dto';
import { SecurityPosture } from '../../models/security-posture.model';

@Injectable()
export class SecurityPostureService {
  constructor(
    @InjectModel(SecurityPosture)
    private readonly securityPostureModel: typeof SecurityPosture,
  ) {}

  // create(createSecurityPostureDto: CreateSecurityPostureDto) {
  //   return 'This action adds a new securityPosture';
  // }

  async findByClientId(clientId: string): Promise<SecurityPosture> {
    const securityPosture = await this.securityPostureModel.findOne({
      where: { clientId },
    });
    console.log('--securityPosture', securityPosture)
    if (!securityPosture) {
      throw new NotFoundException(
        `Security Posture for clientId '${clientId}' not found.`,
      );
    }

    return securityPosture.dataValues as SecurityPosture;
  }

  // update(id: number, updateSecurityPostureDto: UpdateSecurityPostureDto) {
  //   return `This action updates a #${id} securityPosture`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} securityPosture`;
  // }
}
