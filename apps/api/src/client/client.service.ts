import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from '../../models/client.model';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client)
    private readonly clientModel: typeof Client,
  ) {}

  async findClient(clientId: string): Promise<Client> {
    const client = await this.clientModel.findOne({
      where: { clientId },
    });
    if (!client) {
      throw new NotFoundException(
        `Client with clientId '${clientId}' not found.`,
      );
    }

    return client;
  }
}
