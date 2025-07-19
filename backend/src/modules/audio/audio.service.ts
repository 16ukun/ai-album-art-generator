import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class AudioService {
  private logger = new Logger(AudioService.name);

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
      return response.data;
    } catch (error) {
      this.logger.error('Failed to call analyzer', error.message);
      if (error.response) {
        this.logger.error('Analyzer response:', error.response.data);
      }
    }
  }
}
