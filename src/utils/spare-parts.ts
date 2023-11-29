export default function spareParts<T>(array: T[], itemsPerPart: number) {
  const sparedParts: T[][] = [];
  const data = [...array];

  while (data.length) {
    sparedParts.push(data.splice(0, itemsPerPart));
  }

  return sparedParts;
}
