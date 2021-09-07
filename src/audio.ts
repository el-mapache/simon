import { playbackSpeed, SquareColors, SquareColorToNote } from './constants';

const BASE_AUDIO_VOLUME = 0.35;
const WEB_AUDIO_ZERO = 0.00001;

const audioContext = new AudioContext();
const volumeNode = audioContext.createGain();
const compressor = audioContext.createDynamicsCompressor();
compressor.threshold.value = -12;
compressor.knee.value = 10;
compressor.ratio.value = 16;
compressor.attack.value = 0;
compressor.release.value = 1;

volumeNode.gain.value = BASE_AUDIO_VOLUME;

volumeNode.connect(compressor);
compressor.connect(audioContext.destination);

const imag = new Float32Array([0, 0, 1, 0, 1, 0, 0, 0]); // sine
const real = new Float32Array(imag.length); // cos
const customWave = audioContext.createPeriodicWave(real, imag); // cos,sine

/**
 * Pointer to when the last played note stopped playing. used when determine
 * if we should play a new sound
 **/
let lastStopTime = audioContext.currentTime;
let lastNode: { tone: OscillatorNode | null; gain: GainNode | null } = {
  tone: null,
  gain: null,
};

export function playTone(currentSquare: SquareColors) {
  const isNotePlaying = audioContext.currentTime < lastStopTime;

  // The user has clicked a square while a note is playing, so clear it
  if (isNotePlaying) {
    // We ramp down for a smooth fade. We choose a number very close to zero as
    // the web audio api doesnt exactly have the concept of a true zero value for volume
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

  toneNode.connect(gainNode);
  lastNode = {
    tone: toneNode,
    gain: gainNode,
  };

  toneNode.setPeriodicWave(customWave);

  toneNode.frequency.value = toneFreq;
  gainNode.connect(volumeNode);
  gainNode.gain.exponentialRampToValueAtTime(
    BASE_AUDIO_VOLUME * 0.9,
    audioContext.currentTime
  );
  const playBackspeedInSec = (playbackSpeed * 2) / 1000;

  const stopTime = audioContext.currentTime + playBackspeedInSec;
  toneNode.start();
  gainNode.gain.exponentialRampToValueAtTime(WEB_AUDIO_ZERO, stopTime);
  toneNode.stop(stopTime);
  lastStopTime = stopTime;
}
