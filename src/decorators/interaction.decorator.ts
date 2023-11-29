import { DISCORD_INTERACTIONS } from 'src/tokens';

export const Interaction = (customId: string): MethodDecorator => {
  return (target, _, descriptor: PropertyDescriptor) => {
    const interactions =
      Reflect.getMetadata(DISCORD_INTERACTIONS, target) || [];
    Reflect.defineMetadata(
      DISCORD_INTERACTIONS,
      [
        ...interactions,
        {
          customId,
          action: descriptor.value
        }
      ],
      target
    );
    return descriptor;
  };
};
