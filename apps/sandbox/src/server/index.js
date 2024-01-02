import Freemarker from 'freemarker';
import { join, dirname } from 'node:path';
import { writeFile, mkdir } from "node:fs/promises"

import data from '../data/index.js'


import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { glob } from 'glob'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const freemarker = new Freemarker({ root: join(__dirname, '../view') });

const parseFile = promisify((...args)=>freemarker.renderFile(...args))

const files = await glob('**/index.ftl', {absolute: true});

await Promise.all(files.map(async (path)=> {
  const result = await parseFile(path, data);

  const newFileName = path
    .replace('src/view', 'pages')
    .replace('ftl', 'html')

  await mkdir(dirname(newFileName), {recursive: true})
 
  await writeFile(newFileName, result)
}))

