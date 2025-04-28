import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { Client } from 'models/client.model';

@Resolver()
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Query(() => [Client])
  async getClient(@Args('clientId') clientId: string): Promise<Client> {
    return this.clientService.findClient(clientId);
  }
}
