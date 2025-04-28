import { ClientService } from './client.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get(':clientId')
  findOne(@Param('clientId') clientId: string) {
    return this.clientService.findClient(clientId);
  }
}
