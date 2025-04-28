import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SecurityPosture } from '../../models/security-posture.model';
import { SecurityPostureService } from './security-posture.service';
import { SecurityPostureController } from './security-posture.controller';
import { SecurityPostureResolver } from './security-posture.resolver';

@Module({
  imports: [SequelizeModule.forFeature([SecurityPosture])],
  controllers: [SecurityPostureController],
  providers: [SecurityPostureService, SecurityPostureResolver],
})
export class SecurityPostureModule {}
