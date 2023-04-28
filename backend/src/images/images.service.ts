import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FetchExternalPhotosDto } from './dto/fetch-external-photos.dto';
import { FetchExternalImagesDto } from './dto/fetch-external-images.dto';

import { Image } from './entities/image.entity';

import { imagesEndpoint, photosEndpoint } from './config/constants';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);
  constructor(private readonly httpService: HttpService) {}

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  async findAll(): Promise<Image[]> {
    const photos = (
      await firstValueFrom(
        this.httpService.get<FetchExternalPhotosDto[]>(photosEndpoint).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened while fetching photos';
          }),
        ),
      )
    ).data.flat();

    const images = (
      await firstValueFrom(
        this.httpService.get<FetchExternalImagesDto[]>(imagesEndpoint).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened while fetching images';
          }),
        ),
      )
    ).data.flat();

    return [
      ...photos.map((photo) => ({
        id: uuidv4(),
        title: photo.title,
        url: photo.url,
      })),
      ...images.map((image) => ({
        id: uuidv4(),
        title: image.title,
        url: image.path,
      })),
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
