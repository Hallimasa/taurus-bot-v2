export function capitalize(content: string) {
  return `${content.charAt(0).toUpperCase()}${content.slice(1).toLowerCase()}`;
}
