export default function (context: AudioContext) {
  const imag = new Float32Array([0, 0, 1, 0, 1, 0, 0, 0]); // sine
  const real = new Float32Array(imag.length); // cos
  const customWave = context.createPeriodicWave(real, imag); // cos,sine

  return {
    create(freq: number) {
      const toneNode = context.createOscillator();
      toneNode.setPeriodicWave(customWave);
      toneNode.frequency.value = freq;
    },
  };
}
