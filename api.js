const path = require('path');
const fs = require('fs');

function pathIsAbsolute(rute) {
  return path.isAbsolute(rute) === true ? rute : path.resolve(rute);
  // operador ternario condiciones ? expre1 :expre2
  // Validando la ruta
}

function validateIfPathExists(rute) { // preguntar si la ruta existe
  return fs.existsSync(rute);
  // estoy jalando el módulo fs, fs se encarga de ver el archivo, si es file o escritorio
}

// Identificar si la  ruta es File o Directorio
const isDir = (rute) => fs.statSync(rute).isDirectory();

// Identificar la extensión del archivo
const extMD = (rute) => path.extname(rute);

// Identificar la extensión del archivo
const readDir = (rute) => {
  let allMD = [];
  const dataDir = fs.readdirSync(rute);
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

// Leyendo el archivo
const readFile = (rute) => fs.readFileSync(rute, 'utf-8');

const joining = (x) => {
  const saveValue = readDir(x);
  const someArrays = [];
  saveValue.forEach((element) => {
    const read = readFile(element);
    someArrays.push(read);
  });
  return someArrays;
};

/* const getMdLinks = (x) => {
    const linksArr = [];
    const dataDir = readDir(x);
    //aquí empieza el otro código para recorrer los arrays
    dataDir.forEach((myfile) => {
    const fileRead = fs.readFileSync(myfile, 'utf-8');
    const links = fileRead.match(regx);
    if (links) {
      links.forEach((link) => {
        const myhref = link.match(regxLink).join().slice(1, -1);
        const mytext = link.match(regxText).join().slice(1, -1);
        const linksObj = {
          href: myhref,
          text: mytext,
          file: myfile,
        };

        linksArr.push(linksObj);
      });
    }
  });
  return linksArr;
};

console.log(getMdLinks(rute1)); */

module.exports = {
  pathIsAbsolute,
  validateIfPathExists,
  isDir,
  joining,
  readFile,
  readDir,
  extMD,
};
