const path = require('path');

const fs = require('fs');

const rute1 = '/home/laboratoria/Documents/LIM014-mdlinks/mdtest/readme.md';
// almacenando la ruta

// const markdown = require('markdown-js');

// const marked = require('marked');
// hola
// const jsdom = require('jsdom');

function validatePath(rute) {
  return path.isAbsolute(rute) === true ? rute : path.resolve(rute);
  // operador ternario condiciones ? expre1 :expre2
  // Validando la ruta
}
const rutaAbsoluta = validatePath(rute1);
// convirtiendo y guardando la ruta en absoluta
console.log(rutaAbsoluta);

function validateIfPathExists(rute) { // preguntar si la ruta existe
  return fs.existsSync(rute);
  // estoy jalando el módulo fs, fs se encarga de ver el archivo, si es file o escritorio
}
// file? verfificar si es directorio
const isItFile = (rute) => {
  const file = fs.statSync(rute);
  const resultFile = file.isDirectory(rute);
  return resultFile;
};
console.log(isItFile('/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola'));

/* const isItDirectory = fs.statSync(rute);
console.log('is directory ? ' + isItDirectory.isDirectory()); */

// Identificar si la  ruta es File o Directorio
const isDir = (rute) => {
  const stats = fs.statSync(rute);
  const isDirectory = stats.isDirectory(rute);
  return isDirectory;
};
console.log(isDir);

// Identificar la extensión del archivo
const extMD = (rute) => path.extname(rute);
console.log(extMD(rute1));

const readDir = (rute) => {
  let allMD = [];
  const dataDir = fs.readdirSync(rute);
  console.log(dataDir);
  dataDir.forEach((files) => {
    const filePath = path.join(rute, files);
    if (extMD(filePath) === '.md') {
      allMD.push(filePath);
    } else if (isDir(filePath) === true) {
      allMD = allMD.concat(readDir(filePath));
    }
  });
  return allMD;
};
console.log(readDir('/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola'));

// Leyendo el archivo
const readArchive = (rute) => fs.readFileSync(rute, 'utf-8');
console.log(readArchive(rute1));

// Contiene links?
const existsLink = fs.existsSync(rute1);
console.log(existsLink);

/* const matchs = /\[(.+)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig.exec(rute1);
console.log(matchs); */

module.exports = {
  validatePath,
  validateIfPathExists,
  isDir,
  readDir,
  readArchive,
};
