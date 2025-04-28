import { PartialType } from '@nestjs/mapped-types';
import { CreateSecurityPostureDto } from './create-security-posture.dto';

export class UpdateSecurityPostureDto extends PartialType(CreateSecurityPostureDto) {}
