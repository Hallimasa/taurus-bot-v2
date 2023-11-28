import { DISCORD_EVENTS } from 'src/tokens';

export const DiscordEvent = (eventName: string): MethodDecorator => {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
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
