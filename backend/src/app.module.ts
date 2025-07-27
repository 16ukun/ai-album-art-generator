import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioModule } from './modules/audio/audio.module';
import { ImageGeneratorService } from './image-generator/image-generator.service';
import { ImageService } from './image/image.service';

@Module({
  imports: [AudioModule],
  controllers: [AppController],
  providers: [AppService, ImageGeneratorService, ImageService],
})
export class AppModule {}
