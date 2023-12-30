import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input:['./src/index.ts'],
  external: ['swiper'],
  plugins:[typescript()],
  output:[{
    format: 'umd',
    dir: './dist'
  }]
})
