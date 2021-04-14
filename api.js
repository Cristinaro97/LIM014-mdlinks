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
const matchLinks = (file) => file.match(regx);
const getLinks = (allMD) => {
  const saveLinks = allMD.map((element) => {
    const readLinks = readFile(element);
    const matchRegex = matchLinks(readLinks);
    const vacios = [];
    matchRegex.forEach((elements) => {
      const linkHrf = elements.match(regxLink).join().slice(1, -1);
      const text = elements.match(regxText).join().slice(1, -1);
      const file = elements;
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
  .catch((resp) => {
    let status;
    let textStatus;
    if (resp.response) {
      status = resp.response.status;
      textStatus = resp.response.statusText;
    }
    return {
      // console.log(status.status);
      hrf, text, file, status, textStatus,
    };
  });
/* const validate = (arrays) => {
  arrays.forEach((element) => {
    const links = element.hrf;
    axios.get(links).then((resp) => {
      const status = resp;
      const object = {
        hrf: element.hrf,
        text: element.text,
        file: element.file,
        status,
      };
      return object;
      // console.log(resp.status);
    });
  });
}; */
validate({
  hrf: 'https://httpstat.us/404',
  text: 'Leer un archivo',
  file: '[Leer un archivo](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)',
}).then((result) => {
  console.log('Response', result);
})
  .catch((result) => {
    console.log('Response', result);
  });
// console.log(validate(extraObj));

// console.log(extraObj.join());
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
  getLinks,
};
