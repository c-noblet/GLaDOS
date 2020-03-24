process.env.NTBA_FIX_319 = 1;
const GLaDOS = require('../glados');
const env = require('../env.json');

beforeEach(() => {
  fetch.resetMocks();
})

describe('GLaDOS.isHome()', () => {

  it('Find the device', async () => {
    fetch.mockResponseOnce({name: env.phones[1].name, state: true})
    
    const response = await GLaDOS.isHome(env.phones[1].name)
    expect(response).toStrictEqual({name: env.phones[1].name, state: true})
  })
})

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
