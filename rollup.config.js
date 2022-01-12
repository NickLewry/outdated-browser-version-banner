import postcss from 'rollup-plugin-postcss';
import { uglify } from "rollup-plugin-uglify";
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/browser.ts',
  output: [
    {
    dir: 'umd',
    format: 'umd',
    sourcemap: true,
    },
  ],
  plugins: [typescript(), nodeResolve(), commonjs(), postcss({ extensions: [ '.css' ]}), uglify()]
};