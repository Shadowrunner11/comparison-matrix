import { defineConfig } from 'vite'
import { run } from 'vite-plugin-run'
import { globSync } from 'glob'

const isDev = process.env.NODE_ENV === 'development'

const devPlugins = [run([{
  name: 'parse ftl',
  run: ['node', 'src/server/index.js'],
  pattern: ['**/*.ftl']
}])]

const plugins = []

if(isDev){
  plugins.push(...devPlugins)
}

export default defineConfig({
  base: './',
  ...(isDev? {}: {root: 'pages'}),
  plugins,
  build:{
    emptyOutDir: true,
    rollupOptions:{
      input: globSync('**/*.html', {ignore: ['node_modules', 'dist']}),
    },
    outDir: '../dist'
  },
})
