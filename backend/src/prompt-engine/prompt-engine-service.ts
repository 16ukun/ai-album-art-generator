export type AudioAnalysis = {
  mood: string;
  tempo: number;
  chroma?: number[];
};

export class PromptEngine {
  generatePrompt(audioAnalysis: AudioAnalysis): string {
    const style: string = this.getStyleFromTempo(audioAnalysis.tempo);
    const moodDescriptor: {
      description: string;
      visuals: string;
      colors: string;
    } = this.getMoodDescriptor(audioAnalysis.mood);
    return `An ${style} and ${moodDescriptor.description} album cover, featuring ${moodDescriptor.visuals}. ${moodDescriptor.colors}`;
  }

  private getStyleFromTempo(tempo: number): string {
    if (tempo < 70) return 'slow-paced';
    if (tempo < 110) return 'mellow';
    if (tempo < 140) return 'rhythmic';
    return 'fast-paced';
  }

  private getMoodDescriptor(mood: string): {
    description: string;
    visuals: string;
    colors: string;
  } {
    const moodMap: Record<
      string,
      { description: string; visuals: string; colors: string }
    > = {
      calm: {
        description: 'soothing atmosphere',
        visuals: 'soft waves and cloudy skies',
        colors: 'Use light blues and soft whites',
      },
      energetic: {
        description: 'high-energy vibe',
        visuals: 'abstract lights and electric bursts',
        colors: 'Use vibrant reds and neon yellows',
      },
      melancholic: {
        description: 'emotional tone',
        visuals: 'rainy cityscapes or empty stages',
        colors: 'Use deep blues and greys',
      },
      dreamy: {
        description: 'surreal and imaginative feel',
        visuals: 'floating islands and cosmic patterns',
        colors: 'Use purples and glowing pastel tones',
      },
      // fallback
      default: {
        description: 'creative mood',
        visuals: 'dynamic patterns and textures',
        colors: 'Use contrasting vibrant colors',
      },
    };

    return moodMap[mood] || moodMap.default;
  }
}
