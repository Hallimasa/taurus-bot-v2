import { BOT_COMMAND } from 'src/tokens';

export type RegisteredCommand = {
  alias: string[];
  action: (...args: string[]) => void;
};

export const Command = (...args: string[]): MethodDecorator => {
  return (target, _, descriptor) => {
    const commands = Reflect.getMetadata(BOT_COMMAND, target) || [];
    Reflect.defineMetadata(
      BOT_COMMAND,
      [
        ...commands,
        {
          alias: args,
          action: descriptor.value
        }
      ],
      target
    );
    return descriptor;
  };
};
