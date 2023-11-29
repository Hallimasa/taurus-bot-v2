export type DiscordInteraction = {
  customId: string;
  action: (...args: any) => void;
};
