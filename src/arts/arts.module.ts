import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArtsController } from './arts.controller';
import { ArtsService } from './arts.service';
import { ArtSchema } from './art.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Art', schema: ArtSchema }])],
  controllers: [ArtsController],
  providers: [ArtsService],
})
export class ArtsModule {}
