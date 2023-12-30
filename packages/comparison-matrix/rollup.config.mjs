import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input:['./src/index.ts'],
  external: ['swiper'],
  plugins:[typescript({exclude: ["src/**/**test.*"]})],
  output:[{
    format: 'umd',
    file: './dist/index.umd.js',
    name: 'comparisonMatrix'
  }, {
    format: 'esm',
    file: './dist/index.esm.js',
  }]
})
