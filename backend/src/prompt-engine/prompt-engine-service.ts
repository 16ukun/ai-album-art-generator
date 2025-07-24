import axios from 'axios';

export type AudioAnalysis = {
  key: string;
  bpm: number;
  energy: number;
  mood: string;
  genre: string;
};

export class PromptEngine {
  async generatePrompt(analysis: AudioAnalysis): Promise<string> {
    const prompt = `You are a creative assistant. Based on the audio analysis below, generate a vivid, imaginative description for an album cover. Genre: ${analysis.genre}, Mood: ${analysis.mood}, Key: ${analysis.key}, Tempo: ${analysis.bpm} BPM, Energy: ${analysis.energy}. Describe the scene in a way that an AI image generator could use to create a cover art.`;
    try {
      const response = await axios.post(
        'https://api.together.xyz/v1/chat/completions',
        {
          model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant that writes creative, vivid prompts for image generation.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.8,
          max_tokens: 300,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          },
        },
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error generating prompt:', error.message);
      if (error.response) {
        console.error('API error response:', error.response.data);
      }
      return 'Failed to generate prompt.';
    }
  }
}
