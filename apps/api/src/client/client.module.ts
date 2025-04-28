import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientResolver } from './client.resolver';
import { Client } from 'models/client.model';

@Module({
  imports: [SequelizeModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [ClientService, ClientResolver],
})
export class ClientModule {}
