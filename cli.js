#!/usr/bin/env node
// Grab provided args.
const [,, ...args] = process.argv;
// console.log(args);
// console.log(args.length);
const { mdLinks } = require('./index.js');
const {
  total,
  linkRotos,
  linksUni,
} = require('./options.js');

// print Hello World provided args
// console.log(`Hello World ${args}`);
// console.log(args[2]);
// console.log(args);

// console.log(newPath);
if (args.length === 0) {
  console.log('Ingresa tu ruta y opciones');
} else if (args.length === 1) {
  console.log('Hola');
  mdLinks(args[0], { validate: false })
    .then((result) => console.table(result));
} else if (args.length === 2 && args.includes('--stats') === true) {
  console.log('Entré en el --stats');
  mdLinks(args[0], { validate: true })
    .then((result) => {
      // console.log(result);
      console.log(total(result[0]));
      console.log(linksUni(result[0]));
      // => [{ href, text, file, status, ok }]
    })
    .catch(console.error);
} else if (args.length === 3 && args.includes('--stats') === true && args.includes('--validate') === true) {
  console.log('Entré en el --stats y --validate');
  mdLinks(args[0], { validate: true })
    .then((result) => {
      // console.log(result);
      console.log(total(result[0]));
      console.log(linksUni(result[0]));
      console.log(linkRotos(result[0]));
      // => [{ href, text, file, status, ok }]
    });
} else if (args.length === 2 && args.includes('--validate') === true) {
  console.log('Entré al que solo tiene --validate');
  mdLinks(args[0], { validate: true })
    .then((result) => {
      console.log(result);
      // => [{ href, text, file, status, ok }]
    })
    .catch(console.error);
}

/* const totalLinks = (arrayURL) => (chalk.bold.cyanBright(`✔ Total : ${arrayURL.length}`));
console.log(totalLinks(resp))
/* mdLinks(args[0]).then((response) => response.forEach((element) => {
    console.log(newAbsolutePath, element.href, element.text);
  }));
} else if (newAbsolutePath && argumentsMd.includes('--validate') && !argumentsMd[4]) {
  mdLinks(newAbsolutePath, { validate: true }).then((response) => response.forEach((element) => {
    console.log(newAbsolutePath, element.href, element.text, element.Status, element.StatusMessage);
  }));
} */
