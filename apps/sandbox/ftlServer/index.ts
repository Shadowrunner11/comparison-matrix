import Freemarker from 'freemarker';
import { join, dirname } from 'node:path';
import { writeFile, mkdir } from "node:fs/promises"

import data from './data'


import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const freemarker = new Freemarker({ root: join(__dirname, '../src/view') });

const parseFile = promisify((...args)=>freemarker.renderFile(...args))

export async function createView(path: string){
  //@ts-expect-error args
  const result: string = await parseFile(path, data);

  const newFileName = path
    .replace('view', 'pages')
    .replace('ftl', 'html')

  await mkdir(dirname(newFileName), {recursive: true})
 
  await writeFile(newFileName, result)
}
