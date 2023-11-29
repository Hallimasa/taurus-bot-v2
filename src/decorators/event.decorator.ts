import { ClientEvents } from 'discord.js';
import { DISCORD_EVENTS } from 'src/tokens';

export const Event = (eventName: keyof ClientEvents): MethodDecorator => {
  return (target, _, descriptor: PropertyDescriptor) => {
    const events = Reflect.getMetadata(DISCORD_EVENTS, target) || [];
    Reflect.defineMetadata(
      DISCORD_EVENTS,
      [
        ...events,
        {
          name: eventName,
          descriptor: descriptor.value
        }
      ],
      target
    );
    return descriptor;
  };
};
