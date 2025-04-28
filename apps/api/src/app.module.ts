import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NameModule } from './name/name.module';
import { ConfigModule } from '@nestjs/config';
import { SecurityPosture } from '../models/security-posture.model';
import { SecurityPostureModule } from './security-posture/security-posture.module';
import { Client } from 'models/client.model';
import { ClientModule } from './client/client.module';
import { VulnerabilityModule } from './vulnerability/vulnerability.module';
import { Vulnerability } from 'models/vulnerability.model';

const PORT = 3306;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost', // process.env.DB_HOST,
      port: PORT, // process.env.DB_PORT,
      username: 'root', // process.env.DB_USERNAME,
      password: 'root', // process.env.DB_PASSWORD,
      database: 'app_db', // process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
      models: [Client, SecurityPosture, Vulnerability],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      path: '/graphql',
      driver: ApolloDriver,
    }),
    NameModule,
    SecurityPostureModule,
    ClientModule,
    VulnerabilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
