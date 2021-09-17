import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Art } from './art.model';

@Injectable()
export class ArtsService {
  constructor(@InjectModel('Art') private readonly ArtModel: Model<Art>) {}

  async insertArt(title: string, desc: string, price: number) {
    const newArt = new this.ArtModel({
      title,
      description: desc,
      price,
    });
    const result = await newArt.save();
    return result.id as string;
  }

  async getArts() {
    const arts = await this.ArtModel.find().exec();
    return arts.map((art) => ({
      id: art.id,
      title: art.title,
      description: art.description,
      price: art.price,
    }));
  }

  async getSingleArt(artId: string) {
    const art = await this.findArt(artId);
    return {
      id: art.id,
      title: art.title,
      description: art.description,
      price: art.price,
    };
  }

  async updateArt(artId: string, title: string, desc: string, price: number) {
    const updatedArt = await this.findArt(artId);
    if (title) {
      updatedArt.title = title;
    }
    if (desc) {
      updatedArt.description = desc;
    }
    if (price) {
      updatedArt.price = price;
    }
    updatedArt.save();
  }

  // async deleteArt(artId: string) {
  //   const result = await this.ArtModel.deleteOne({ _id: artId }).exec();
  //   if (result.id === 0) {
  //     throw new NotFoundException('Could not find Art.');
  //   }
  // }

  private async findArt(id: string): Promise<Art> {
    let art;
    try {
      art = await this.ArtModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Art.');
    }
    if (!art) {
      throw new NotFoundException('Could not find Art.');
    }
    return art;
  }
}
