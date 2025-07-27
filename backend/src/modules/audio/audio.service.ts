import { ImageGeneratorService } from './../../image-generator/image-generator.service';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
// import * as FormData from 'form-data';
import FormData from 'form-data';
import path from 'path';
import fs from 'fs';
import { ImageService } from 'src/image/image.service';

import {
  AudioAnalysis,
  PromptEngine,
} from 'src/prompt-engine/prompt-engine-service';

@Injectable()
export class AudioService {
  private logger = new Logger(AudioService.name);
  private promptEngine = new PromptEngine();

  constructor(private readonly imageService: ImageService) {}

  async sendToAnalyzer(file: Express.Multer.File) {
    const form = new FormData();
    form.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    try {
      // 1. Send audio to analyzer (Python Flask)
      const response = await axios.post('http://analyzer:5000/analyze', form, {
        headers: form.getHeaders(),
      });

      // 2. Generate prompt from audio analysis
      const prompt = await this.generatePrompt(response.data);
      this.logger.log(`Generated prompt: ${prompt}`);

      // 3. Call Hugging Face to generate image
      const imageBuffer = await this.imageService.generateImage(prompt);

      // 4. Save image to disk - I think I'll use an S3 or similar later
      const filename = `${Date.now()}_album_cover.png`;
      const outputDir = path.join(__dirname, '../../../images');

      // Ensure the directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const outputPath = path.join(outputDir, filename);
      fs.writeFileSync(outputPath, imageBuffer);
      this.logger.log(`Image saved to ${outputPath}`);

      // 5. Return data
      return {
        prompt,
        imagePath: outputPath,
        filename,
      };
    } catch (error) {
      this.logger.error(
        'Failed during audio analysis or image generation',
        error.message,
      );
      if (error.response) {
        this.logger.error(
          'Analyzer or HuggingFace error:',
          error.response.data,
        );
      }
      throw error;
    }
  }

  private async generatePrompt(audoAnalysis: AudioAnalysis): Promise<string> {
    return await this.promptEngine.generatePrompt(audoAnalysis);
  }
}
