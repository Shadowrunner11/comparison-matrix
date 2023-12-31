import Freemarker from 'freemarker';
import path, { join } from 'node:path';
import { writeFile } from "node:fs/promises"

import data from '../data/index.js'


import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const freemarker = new Freemarker({ root: join(__dirname, '../view') });

const renderFile = promisify((...args)=>freemarker.renderFile(...args))


const result = await renderFile(join(__dirname, '../view/index.ftl'), data)

await writeFile(join(__dirname, '../../index.html'), result)