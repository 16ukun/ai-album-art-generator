import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ImageService {
  private logger = new Logger(ImageService.name);
  private apiUrl =
    'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0';

  async generateImage(prompt: string): Promise<Buffer> {
    this.logger.log(`Sending prompt to Hugging Face: ${prompt}`);

    try {
      const response = await axios.post(
        this.apiUrl,
        { inputs: prompt },
        {
          responseType: 'arraybuffer',
          headers: {
            Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}`,
            'Content-Type': 'application/json',
            Accept: 'image/png',
          },
        },
      );

      this.logger.log('Image generated successfully');
      return Buffer.from(response.data); // It's a binary image
    } catch (error) {
      this.logger.error('Failed to generate image', error.message);
      if (error.response?.data) {
        this.logger.error(error.response.data);
      }
      throw error;
    }
  }
}
