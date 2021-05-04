const total = (resp) => resp.length;
// console.log(total(example));
const example = [{
  hrf: 'https://nodejs.org/api/path.html',
  text: 'Path',
  file: '/home/laboratoria/Documents/LIM014-mdlinks/README.md',
}, {
  hrf: 'https://nodejs.org/api/path.html',
  text: 'Path',
  file: '/home/laboratoria/Documents/LIM014-mdlinks/README.md',
  status: 200,
  textStatus: 'OK',
}, {
  hrf: 'nodejs.org/api/path.html',
  text: 'Path',
  file: '/home/laboratoria/Documents/LIM014-mdlinks/README.md',
  status: 400,
  statusText: 'OK',
}, {
  hrf: 'nodejs.org/api/pa',
  text: 'Path',
  file: '/home/laboratoria/Documents/LIM014-mdlinks/README.md',
  status: 400,
  statusText: 'OK',
}];

const linksUni = (resp) => {
  const linksArray = resp.map((element) => element.href);
  const unity = new Set(linksArray).size;
  return unity;
};
// console.log(linksUni(example));
const linkRotos = (resp) => {
  const linksrotitos = (resp.filter((element) => (element.status >= 400))).length;
  return linksrotitos;
};
// console.log(linkRotos(example));
module.exports = {
  total,
  linksUni,
  linkRotos,
};
