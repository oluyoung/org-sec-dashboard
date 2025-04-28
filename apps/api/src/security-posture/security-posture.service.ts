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

  async findByClientId(clientId: string): Promise<SecurityPosture> {
    const securityPosture = await this.securityPostureModel.findOne({
      where: { clientId },
      raw: true,
      nest: true,
    });

    if (!securityPosture) {
      throw new NotFoundException(
        `Security Posture for clientId '${clientId}' not found.`,
      );
    }

    return securityPosture;
  }

  // update(id: number, updateSecurityPostureDto: UpdateSecurityPostureDto) {
  //   return `This action updates a #${id} securityPosture`;
  // }
}
