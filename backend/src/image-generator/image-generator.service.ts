import { Injectable, Logger } from '@nestjs/common';
// import Replicate from 'replicate';
import * as Replicate from 'replicate';

@Injectable()
export class ImageGeneratorService {
  private logger = new Logger(ImageGeneratorService.name);

  async generateImage(prompt: string): Promise<string> {
    const replicate = new (Replicate as any).default({
      // Using 'as any' might be needed for transpilation
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      'bytedance/sdxl-lightning-4step:6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe',
      {
        input: {
          prompt: prompt,
        },
      },
    );
    this.logger.log(`LOGGING OUTPUT FROM REPLICATE ${output[0]}`);
    this.logger.log(`LOGGING OUTPUT url FROM REPLICATE ${output[0].url()}`);
    return output[0];
  }
}
