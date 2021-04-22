const axios = require('axios');
const { validate } = require('../api.js');

jest.mock('axios');
describe('validate', () => {
  test('should show an output of 5 items(hrf, text, file, status and textStatus)', () => {
    const path = {
      hrf: 'https://nodejs.org/api/path.html',
      text: 'Path',
      file: '/home/laboratoria/Documents/LIM014-mdlinks/README.md',
    };
    const finalOutput = {
      hrf: 'https://nodejs.org/api/path.html',
      text: 'Path',
      file: '/home/laboratoria/Documents/LIM014-mdlinks/README.md',
      status: 200,
      textStatus: 'OK',
    };
    const axiosResponse = {
      status: 200,
      statusText: 'OK',
    };
    axios.get.mockImplementation(() => Promise.resolve(axiosResponse));
    // este get viene de axios.js
    return validate(path).then((data) => {
      expect(data).toEqual(finalOutput);
    });
  });
  test('should show FAIL 404 output', () => {
    const failPath = {
      hrf: 'http://www.abab.com.pe/aldo-bruno',
      text: 'Markdown',
      file: '/home/laboratoria/Documents/LIM014-mdlinks/README.md',
    };
    const failOutput = {
      hrf: 'http://www.abab.com.pe/aldo-bruno',
      text: 'Markdown',
      file: '/home/laboratoria/Documents/LIM014-mdlinks/README.md',
      status: 404,
      textStatus: 'FAIL',
    };
    const axiosFailResponse = {
      response: {
        status: 404,
        textStatus: 'FAIL',
      },
    };
    axios.get.mockImplementation(() => Promise.reject(axiosFailResponse));
    return validate(failPath).then((data) => {
      expect(data).toEqual(failOutput);
    });
  });
});
