import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NameModule } from './name/name.module';
import { ConfigModule } from '@nestjs/config';
import { SecurityPosture } from '../models/security-posture.model';

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
      models: [SecurityPosture],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      path: '/graphql',
      driver: ApolloDriver,
    }),
    NameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
