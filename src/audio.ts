import { SquareColors, SquareColorToNote } from './constants';

const BASE_AUDIO_VOLUME = 0.25;
const WEB_AUDIO_ZERO = 0.00001;

const audioContext = new AudioContext();
const volumeNode = audioContext.createGain();
const compressor = audioContext.createDynamicsCompressor();
compressor.threshold.value = -25;
compressor.knee.value = 1;
compressor.ratio.value = 16;
compressor.attack.value = 0;
compressor.release.value = 1.5;

volumeNode.gain.value = BASE_AUDIO_VOLUME;

volumeNode.connect(compressor);
compressor.connect(audioContext.destination);

function createSineTone(audioContext: AudioContext) {
  const imag = new Float32Array([0, 0, 1, 0, 1, 0, 0, 0]); // sin
  const real = new Float32Array(imag.length); // cos

  return audioContext.createPeriodicWave(real, imag); // cos,sin
}

const customWaveform = createSineTone(audioContext);

/**
 * Pointer to when the last played note stopped playing. used when determine
 * if we should play a new sound
 **/
let lastStopTime = audioContext.currentTime;
let lastNode: { tone: OscillatorNode | null; gain: GainNode | null } = {
  tone: null,
  gain: null,
};

export function playTone(currentSquare: SquareColors, speed: number) {
  const isNotePlaying = audioContext.currentTime < lastStopTime;
  const PLAYBACK_SPEED_IN_SECONDS = (speed * 2) / 1000;

  // The user has clicked a square while a note is playing, so clear it
  if (isNotePlaying) {
    lastNode.gain?.gain.exponentialRampToValueAtTime(
      WEB_AUDIO_ZERO,
      audioContext.currentTime
    );
    lastNode.tone?.stop(audioContext.currentTime);
    lastNode.tone = null;
    lastNode.gain = null;
  }

  const toneFreq = SquareColorToNote[currentSquare];
  const toneNode = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  gainNode.gain.value = WEB_AUDIO_ZERO;
  toneNode.connect(gainNode);
  lastNode = {
    tone: toneNode,
    gain: gainNode,
  };

  toneNode.setPeriodicWave(customWaveform);

  toneNode.frequency.value = toneFreq;
  gainNode.connect(volumeNode);

  const stopTime = audioContext.currentTime + PLAYBACK_SPEED_IN_SECONDS;
  gainNode.gain.setValueAtTime(
    BASE_AUDIO_VOLUME * 0.9,
    audioContext.currentTime
  );

  toneNode.start();

  gainNode.gain.exponentialRampToValueAtTime(WEB_AUDIO_ZERO, stopTime);
  toneNode.stop(stopTime);
  lastStopTime = stopTime;
}
