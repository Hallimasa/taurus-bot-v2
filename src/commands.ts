export type Command = {
  command: string;
  alias: string;
  useCases: string | string[];
  description: string;
};

const commands: Command[] = [
  {
    command: 'mod-info',
    alias: 'mi',
    useCases: ['$taurus mod-info Pressure Point', '$taurus mi Pressure Point'],
    description: 'Informações gerais sobre mods.'
  }
];

export default commands;
