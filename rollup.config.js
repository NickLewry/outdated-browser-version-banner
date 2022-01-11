import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/browser.ts',
  output: [
    {
    dir: 'umd',
    format: 'umd',
    sourcemap: true,
    },
  ],
  plugins: [typescript(), nodeResolve(), commonjs()]
};