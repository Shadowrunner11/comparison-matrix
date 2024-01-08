import { defineConfig } from 'vite'
import { run } from 'vite-plugin-run'
import { createView } from './ftlServer'
const isDev = process.env.NODE_ENV === 'development'

const devPlugins = [run([{
  name: 'parse ftl',
  pattern: ['**/*.ftl'],
  onFileChanged({file}){
    createView(file)
  }
}])]

const plugins = []

if(isDev){
  plugins.push(...devPlugins)
}

export default defineConfig({
  base: './',
  plugins,
})
