export default function (context: AudioContext) {
  const volumeNode = context.createGain();
  const compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -12;
  compressor.knee.value = 10;
  compressor.ratio.value = 16;
  compressor.attack.value = 0;
  compressor.release.value = 1;

  volumeNode.connect(compressor);
  compressor.connect(context.destination);

  return {
    get volume() {
      return volumeNode;
    },
    get compressor() {
      return compressor;
    },
  };
}
