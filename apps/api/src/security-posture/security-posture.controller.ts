import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  // Delete,
  Param,
} from '@nestjs/common';
import { SecurityPostureService } from './security-posture.service';
// import { CreateSecurityPostureDto } from './dto/create-security-posture.dto';
// import { UpdateSecurityPostureDto } from './dto/update-security-posture.dto';

@Controller('api/clients')
export class SecurityPostureController {
  constructor(
    private readonly securityPostureService: SecurityPostureService,
  ) {}

  // @Post(':clientId/security-posture')
  // create(@Body() createSecurityPostureDto: CreateSecurityPostureDto) {
  //   return this.securityPostureService.create(createSecurityPostureDto);
  // }

  @Get(':clientId/security-posture')
  findOne(@Param('clientId') clientId: string) {
    return this.securityPostureService.findByClientId(clientId);
  }

  // @Patch(':clientId')
  // update(
  //   @Param('clientId') clientId: string,
  //   @Body() updateSecurityPostureDto: UpdateSecurityPostureDto,
  // ) {
  //   return this.securityPostureService.update(clientId, updateSecurityPostureDto);
  // }
}
