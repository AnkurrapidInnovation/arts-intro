import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ArtsService } from './arts.service';

@Controller('arts')
export class ArtsController {
  constructor(private readonly artsService: ArtsService) {}

  @Post()
  async addArt(
    @Body('title') artTitle: string,
    @Body('description') artDesc: string,
    @Body('price') artPrice: number,
  ) {
    const generatedId = await this.artsService.insertArt(
      artTitle,
      artDesc,
      artPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllArts() {
    const arts = await this.artsService.getArts();
    return arts;
  }

  @Get(':id')
  getArt(@Param('id') artId: string) {
    return this.artsService.getSingleArt(artId);
  }

  @Patch(':id')
  async updateArt(
    @Param('id') artId: string,
    @Body('title') artTitle: string,
    @Body('description') artDesc: string,
    @Body('price') artPrice: number,
  ) {
    await this.artsService.updateArt(artId, artTitle, artDesc, artPrice);
    return null;
  }

  //     @Delete(':id')
  //     async removeArt(@Param('id') artId: string) {
  //         await this.artsService.deleteArt(artId);
  //         return null;
  //     }
}
