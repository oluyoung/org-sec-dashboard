import { ClientService } from './client.service';
import { Controller, Get, Headers } from '@nestjs/common';

@Controller('api/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('me')
  findOne(@Headers('X-CLIENT-ID') clientId: string) {
    return this.clientService.findClient(clientId);
  }
}
