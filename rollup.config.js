import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/browser.ts',
  output: [
    {
    dir: 'umd',
    format: 'umd',
    sourcemap: true,
    },
  ],
  plugins: [typescript()]
};