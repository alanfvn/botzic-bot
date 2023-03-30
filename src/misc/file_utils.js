import {pathToFileURL, fileURLToPath} from 'url'
import path from 'path'
import fs from 'fs'

function getPath(dir1, dir2){
  return path.join(dir1, dir2)
}

function getJSFiles(path){
  return fs.readdirSync(path)
    .filter(file => file.endsWith('.js'))
}

function getDir(meta){
  const __filename = fileURLToPath(meta);
  const __dirname = path.dirname(__filename);
  return __dirname
}

async function requireFile(filePath){
  const file = await import(pathToFileURL(filePath))
  return file
}

export {getDir, requireFile, getPath, getJSFiles}
