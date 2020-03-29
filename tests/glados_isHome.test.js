process.env.NTBA_FIX_319 = 1;
const GLaDOS = require('../glados');
const env = require('../env.json');

describe('GLaDOS.isHome()', () => {

  it('Detect if a phone is home', async () => {
    const name = 'Corentin';
    const response = await GLaDOS.isHome(name);
    expect(response).toBe({name: 'Corentin', state: true});
  });

})