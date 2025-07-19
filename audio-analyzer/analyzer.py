import librosa
import numpy as np
import tempfile

def analyze(file):
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        file.save(tmp.name)
        y, sr = librosa.load(tmp.name)
        tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
        tempo = float(tempo)  # convert to plain Python float
        chroma = librosa.feature.chroma_stft(y=y, sr=sr)
        chroma_mean = np.mean(chroma, axis=1)
        mood = "energetic" if tempo > 120 else "calm"
        return {
            "tempo": round(tempo, 2),
            "mood": mood,
            "chroma": chroma_mean.tolist()
        }
    
