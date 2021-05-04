const {
  pathIsAbsolute,
  validateIfPathExists,
  isDir,
  readDir,
  getLinks,
  linksValidate,
  extMD,
} = require('./api.js');

// const rute1 = '/home/laboratoria/Documents/LIM014-mdlinks/mdtest';
const rute2 = '/home/laboratoria/Documents/LIM014-mdlinks/README.md';
// const rute3 = 'readme.mds';
const mdLinks = (rute, option = { validate: false }) => new Promise((resolve, reject) => {
  const rutaAbsoluta = pathIsAbsolute(rute);
  const error = 'ERROR';
  const validatePath = validateIfPathExists(rutaAbsoluta);
  if (validatePath === true) {
    if (isDir(rutaAbsoluta) === true) {
      const dataMd = readDir(rutaAbsoluta);
      if (option.validate === false) {
        resolve(getLinks(dataMd));
      } else {
        const links = Promise.all(linksValidate(dataMd));// validamos si el link es válido
        resolve(links).flat();
      }
    } else if (extMD(rutaAbsoluta) === '.md') {
      if (option.validate === false) {
        const saveLinks = getLinks([rutaAbsoluta]);
        resolve(saveLinks);
      } else {
        const links = Promise.all(linksValidate([rutaAbsoluta]));
        resolve(links);
      }
    }
  } reject(error);
});

/* if (isDirr === true) {
      const readDirr = readDir(rutaAbsoluta);
      // leyendo el directorio y sacando los file en un array
      const listLink = [];
      readDirr.forEach((element) => {
        const readFiles = readFile(element); // leyendo el contenido de los archivos md
        // console.log(readFiles);
      });
      return readDirr;
    }
    if (extMD(rutaAbsoluta)) {
      // getLinks([rutaAbsoluta]);
      const getLinks2 = getLinks([rutaAbsoluta]);
      return validate(getLinks2).then((resp) => resp);
    }
  }
  return new Error('La ruta no existe');
}; */
// mdLinks(rute2, { validate: true }).then((resp) => console.log(resp));

module.exports = {
  mdLinks,
};
