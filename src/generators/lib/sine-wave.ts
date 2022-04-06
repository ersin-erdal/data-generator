export const sineWaveConfig = (min: number, max: number, period: number) => ({
  generatorType: 'sineWave',
  params: {
    min,
    max,
    period,
  },
});
