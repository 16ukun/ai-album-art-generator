import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import {
  AudioAnalysis,
  PromptEngine,
} from 'src/prompt-engine/prompt-engine-service';

@Injectable()
export class AudioService {
  private logger = new Logger(AudioService.name);
  private promptEngine = new PromptEngine();

  async sendToAnalyzer(file: Express.Multer.File) {
    const form = new FormData();
    form.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    try {
      const response = await axios.post('http://analyzer:5000/analyze', form, {
        headers: form.getHeaders(),
      });
      // I think I'll use an object here to maintain the shape of the response
      const prompt = await this.generatePrompt(response.data);
      this.logger.log(`Generated prompt: ${prompt}`);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to call analyzer', error.message);
      if (error.response) {
        this.logger.error('Analyzer response:', error.response.data);
      }
    }
  }

  private async generatePrompt(audoAnalysis: AudioAnalysis): Promise<string> {
    return this.promptEngine.generatePrompt(audoAnalysis);
  }
}
