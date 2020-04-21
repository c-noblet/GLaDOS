import { CommandContext } from '../context/commandContext';

export default {
  name: 'test',
  description: 'is a test',
  run(context: CommandContext) {
    console.log(context.args[0]);
    return 'tested'
  }
}