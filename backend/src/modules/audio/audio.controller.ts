import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AudioService } from './audio.service';
import { Express } from 'express';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get('test') // Add this test route
  testAudioRoute(): string {
    return 'Audio module is working!';
  }

  @Post('analyze')
  @UseInterceptors(FileInterceptor('file'))
  async analyzeAudio(@UploadedFile() file: Express.Multer.File) {
    return this.audioService.sendToAnalyzer(file);
  }
}
