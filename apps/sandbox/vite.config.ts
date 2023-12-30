import { defineConfig } from 'vite'
import { run } from 'vite-plugin-run'

export default defineConfig({
  plugins: [run([{
    name: 'parse ftl',
    run: ['node', 'src/server/index.js'],
    pattern: ['src/**/*.ftl']
  }])]
})
