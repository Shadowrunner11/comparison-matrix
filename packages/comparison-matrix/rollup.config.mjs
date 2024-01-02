import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript';
import sass from 'rollup-plugin-sass';
import { dirname, join } from 'node:path'

import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

import designTokens from './designTokens.mjs';

import { copyFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default defineConfig([{
  input:['./src/index.ts'],
  external: ['swiper'],
  plugins:[{
      name: 'closeBundle',
      async closeBundle(){
        await copyFile(join(__dirname,'package.json'), join(__dirname,'/dist/package.json'))
      }
    },
    typescript({exclude: ["src/**/**test.*"]}), 
    sass({
      output:'./dist/styles.css',
      options:{
        data: parseToSassVariables(designTokens)
      },
      processor: css => postcss([autoprefixer()])
        .process(css, {})
        .then(result => result.css)
    })
  ],
  output:[{
    format: 'umd',
    file: './dist/index.umd.js',
    name: 'comparisonMatrix',
  }, {
    format: 'esm',
    file: './dist/index.esm.js',
  }]
}])


/**
 * 
 * @param {Record<string, string>} variables 
 * @returns 
 */
function parseToSassVariables(variables){
  return Object.entries(variables)
    .map(values => values.join(': ')).join(';') + ';'
}



