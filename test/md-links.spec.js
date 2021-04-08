const {
  pathIsAbsolute,
  validateIfPathExists,
  isDir,
  readDir,
  readFile,
} = require('../api.js');

describe('Validateifpathexists is a function?', () => {
  it('should be a function', () => {
    expect(typeof validateIfPathExists).toBe('function');
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
});
it('return one value', () => {
  expect(readFile('/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola/hola.md')).toEqual('Hola mundo');
});
