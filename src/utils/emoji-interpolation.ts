export function parseWfDescription(description: string) {
  return description.replaceAll(
    '<ARCHWING>',
    '<:archwing:1179486961434628216>'
  );
}
