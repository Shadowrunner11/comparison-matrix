import Freemarker from 'freemarker';
import path, { join } from 'path';

import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const freemarker = new Freemarker({ root: __dirname });

const renderFile = promisify((...args)=>freemarker.renderFile(...args))

const result = await renderFile(join(__dirname, 'index.ftl'), {message: 'Luiggy no te mueras pe'})

console.log(result)

