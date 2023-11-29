import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default function Button(label: string, custom_id: string) {
  return new ButtonBuilder({
    style: ButtonStyle.Primary,
    custom_id,
    label,
    emoji: ''
  });
}
