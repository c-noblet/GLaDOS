process.env.NTBA_FIX_319 = 1;
const GLaDOS = require('../glados');
const env = require('../env.json');

describe('GLaDOS.servo()', () => {

  it('Move the servo to 90 degrees', async () => {
    const test = await GLaDOS.servo(90)
    expect(test).toBe(true);
  })

  it('Move the servo to -90 degrees', async () => {
    const test = await GLaDOS.servo(-90)
    expect(test).toBe(true);
  })

  it('Move the servo to 0 degrees', async () => {
    const test = await GLaDOS.servo(0)
    expect(test).toBe(true);
  })

})
