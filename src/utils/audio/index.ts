// @ts-nocheck
import context from 'utils/audio/audioContext';
import { SquareColorToNote } from '../../constants';
import signalChain from './signalChain';
import tone from './tone';

const BASE_AUDIO_VOLUME = 0.35;

function AudioManager() {
  const effectsChain = signalChain(context);
  const toneGenerator = tone(context);

  return {
    play(note: string) {
      const freq = SquareColorToNote[note];
      const tone = toneGenerator.create(freq);
    },
    get currentTime() {
      return context.currentTime;
    },
  };
}
