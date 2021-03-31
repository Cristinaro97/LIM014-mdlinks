const {
  validatePath,
  validateIfPathExists,
  isDir,
  readDir,
  readArchive,
} = require('../index.js');

describe('ValidatePath is a function?', () => {
  it('should be a function', () => {
    expect(typeof validatePath).toBe('function');
  });
});
describe('Validateifpathexists is a function?', () => {
  it('should be a function', () => {
    expect(typeof validateIfPathExists).toBe('function');
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
describe('readArchive is a function?', () => {
  it('should be a function', () => {
    expect(typeof readArchive).toBe('function');
  });
});
it('return one value', () => {
  expect(readArchive('/home/laboratoria/Documents/LIM014-mdlinks/mdtest/hola/hola.md')).toEqual('Hola mundo');
});
