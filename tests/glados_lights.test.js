process.env.NTBA_FIX_319 = 1;
const GLaDOS = require('../glados');
const env = require('../env.json');

beforeEach(() => {
  fetch.resetMocks();
})

describe('GLaDOS.lights()', () => {

  it('set the lights on', async () => {
    const response = await GLaDOS.lights([1,2,3], true, 254, 254, 65535);
    expect(response).toBe([
      { success: { '/lights/1/state/on': true } },
      { success: { '/lights/1/state/hue': 65535 } },
      { success: { '/lights/1/state/sat': 254 } },
      { success: { '/lights/1/state/bri': 254 } }
    ]);
  });

  it('set the lights off', async () => {
    const response = await GLaDOS.lights([1,2,3], false, 254, 254, 65535);
    expect(response).toBe([
      { success: { '/lights/1/state/hue': 65535 } },
      { success: { '/lights/1/state/sat': 254 } },
      { success: { '/lights/1/state/bri': 254 } },
      { success: { '/lights/1/state/on': false } }
    ]);
  });

})