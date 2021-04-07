const path = require('path');
const fs = require('fs');
const {
  pathIsAbsolute,
  validateIfPathExists,
  isDir,
  extMD,
  readDir,
  readFile,
} = require('./api.js');

const regx = /\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
const regxLink = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
const regxText = /\[([\w\s\d.()]+)\]/g;
const rute1 = '/home/laboratoria/Documents/LIM014-mdlinks/mdtest';
const rute2 = 'README.md';
const rute3 = 'readme.mds';
const mdLinks = (rute, option = { validate: false }) => {
  const rutaAbsoluta = pathIsAbsolute(rute);
  const validatePath = validateIfPathExists(rutaAbsoluta);
  if (validatePath === true) {
    const isDirr = isDir(rutaAbsoluta);
    if (isDirr === true) {
      const readDirr = readDir(rutaAbsoluta);
      // leyendo el directorio y sacando los file en un array
      const listLink = [];
      readDirr.forEach((element) => {
        const readFiles = readFile(element); // leyendo el contenido de los archivos md
        console.log(readFiles);
      });
      return readDirr;
    }
    if (extMD(rutaAbsoluta)) {
      const listLink = readFile(rutaAbsoluta);
      console.log(listLink);
      return 'Soy archivo, soy file md.';
    }
  }
  return new Error('La ruta no existe');
};
console.log(mdLinks(rute2));

/* const resultFile = file.isDirectory(rute);
  return resultFile; */

/* const isItDirectory = fs.statSync(rute);
  console.log('is directory ? ' + isItDirectory.isDirectory()); */
// Contiene links?
