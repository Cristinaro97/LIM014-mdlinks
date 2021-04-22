const path = require('path');
const fs = require('fs');

const regx = /\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
const regxLink = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
const regxText = /\[([\w\s\d.()]+)\]/g;
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

// Identificar la extensión del archivo, pero devuelve en string la extensión del archivo 'md, html'
const extMD = (rute) => path.extname(rute);

// Identificar la extensión del archivo
const readDir = (rute) => {
  let allMD = [];
  const dataDir = fs.readdirSync(rute);
  dataDir.forEach((files) => { // Evalúa por carpeta
    const filePath = path.join(rute, files);
    if (extMD(filePath) === '.md') {
      allMD.push(filePath);
    } else if (isDir(filePath) === true) {
      allMD = allMD.concat(readDir(filePath)); // reasignando a concatenar
    }
  });
  return allMD;
};

// Leyendo el archivo
const readFile = (rute) => fs.readFileSync(rute, 'utf-8');

const matchLinks = (file) => file.match(regx); // Ingresa al contenido que está en el archivo;
// md y es un string, luego el resultado es un array de caracteres, corchetes y paréntesis
// console.log(matchLinks(readFile('/home/laboratoria/Documents/
// LIM014-mdlinks/mdtest/hola/hola.md')));

const getLinks = (allMD) => {
  const saveLinks = allMD.map((element) => {
    const readLinks = readFile(element);
    const matchRegex = matchLinks(readLinks);
    // console.log(matchRegex);
    const vacios = [];
    matchRegex.forEach((elements) => {
      const linkHrf = elements.match(regxLink).join().slice(1, -1);
      const text = elements.match(regxText).join().slice(1, -1);
      const file = element;
      vacios.push({
        hrf: linkHrf,
        text,
        file,
      });
    });
    return vacios;
  });
  return saveLinks.flat();
};

// console.log(getLinks(['/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola/hola.md']));
// Validando links (1)
const axios = require('axios');

const validate = ({ hrf, text, file }) => axios.get(hrf)
  .then((resp) => {
    const { status } = resp;
    const textStatus = resp.statusText;
    return {
      hrf, text, file, status, textStatus,
    };
  })
  .catch((error) => {
    let status;
    let textStatus;
    if (error.response) {
      status = error.response.status;
      textStatus = 'FAIL';
    } else {
      status = 'Not status';
      textStatus = 'FAIL';
    }
    return {
      hrf, text, file, status, textStatus,
    };
  });
const linksValidate = (allMD) => {
  const saveLinks = allMD.map((element) => {
    const readLinks = readFile(element);
    const matchRegex = matchLinks(readLinks);
    const vacios = [];
    matchRegex.forEach((elements) => {
      const hrf = elements.match(regxLink).join().slice(1, -1);
      const text = elements.match(regxText).join().slice(1, -1);
      const file = element;
      const linksObject = validate({ hrf, text, file });
      vacios.push(linksObject);
    });
    return Promise.all(vacios);
  });
  return saveLinks;
};

module.exports = {
  pathIsAbsolute,
  validateIfPathExists,
  isDir,
  readFile,
  readDir,
  extMD,
  getLinks,
  validate,
  linksValidate,
  matchLinks,
};
