import { RegisteredCommand } from 'src/decorators/command.decorator';
import { BOT_COMMAND } from 'src/tokens';

export const findRegisteredAction = (command: string, target: object) => {
  const actions = (Reflect.getMetadata(BOT_COMMAND, target) ||
    []) as RegisteredCommand[];

  const action = actions.find((_command) => _command.alias.includes(command));

  if (!action) {
    throw new Error('Attempting to use an unregistered command');
  }

  return action.action.bind(this);
};
