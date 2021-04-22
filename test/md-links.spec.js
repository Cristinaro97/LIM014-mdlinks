const {
  pathIsAbsolute,
  validateIfPathExists,
  isDir,
  readDir,
  readFile,
  extMD,
  matchLinks,
  getLinks,
  // validate,
  // linksValidate,
} = require('../api.js');

describe('Validateifpathexists is a function?', () => {
  it('should be a function', () => {
    expect(typeof validateIfPathExists).toBe('function');
  });
  it('return', () => {
    expect(validateIfPathExists('/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola')).toBe(true);
  });
});

describe('pathIsAbsolute is a function?', () => {
  it('should be a function', () => {
    expect(typeof pathIsAbsolute).toBe('function');
  });
});

describe('isDir is a function', () => {
  it('should be a function', () => {
    expect(typeof isDir).toBe('function');
  });
  it('return one value', () => {
    expect(isDir('/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola')).toEqual(true);
  });
});

describe('readDir is a function', () => {
  it('Should be a function', () => {
    expect(typeof readDir).toBe('function');
  });
  it('return one value', () => {
    expect(readDir('/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola')).toEqual(['/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola/hola.md', '/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola/hola2/hola2.md']);
  });
});
describe('readFile is a function?', () => {
  it('should be a function', () => {
    expect(typeof readFile).toBe('function');
  });
  it('return one value', () => {
    expect(readFile('/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola/hola.md')).toEqual('[Markdown](https://es.wikipedia.org/wiki/Markdown) jdowjdewjdewjewjlewjflewj');
  });
});
describe('extMD is a function', () => {
  it('should be a function', () => {
    expect(typeof extMD).toBe('function');
  });
  it('return one extension', () => {
    expect(extMD('/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola/hola2/hola2.md')).toBe('.md');
  });
});
describe('matchLinks is a function', () => {
  it('should be a function', () => {
    expect(typeof matchLinks).toBe('function');
  });
  it('return one array', () => {
    expect(matchLinks(readFile('/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola/hola.md'))).toEqual(['[Markdown](https://es.wikipedia.org/wiki/Markdown)']);
  });
});
describe('getLinks is a function', () => {
  it('should be a function', () => {
    expect(typeof getLinks).toBe('function');
  });
  it('return one array', () => {
    expect(getLinks(['/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola/hola.md'])).toEqual([
      {
        hrf: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: '/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola/hola.md',
      },
    ]);
  });
});
