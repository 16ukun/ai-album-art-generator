import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioModule } from './modules/audio/audio.module';
import { ImageGeneratorService } from './image-generator/image-generator.service';

@Module({
  imports: [AudioModule],
  controllers: [AppController],
  providers: [AppService, ImageGeneratorService],
})
export class AppModule {}
