import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtsModule } from './arts/arts.module';

@Module({
  imports: [
    ArtsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/arts'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
