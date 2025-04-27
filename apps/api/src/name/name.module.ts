import { Module } from '@nestjs/common';
import { NameResolver } from './name.resolver';
import { NameController } from './name.controller';

@Module({
  providers: [NameResolver],
  controllers: [NameController],
})
export class NameModule {}
