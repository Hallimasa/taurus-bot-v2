export type DiscordEvent = {
  name: string;
  descriptor: (...args: any) => void;
};
