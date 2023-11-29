export function parseHabilityDescription(description: string) {
  return description
    .replaceAll('<DT_FIRE>', '<:dmg_heat:1179474606030061750>')
    .replaceAll('<DT_FREEZE>', '<:dmg_cold:1179474613848252557>')
    .replaceAll('<DT_EXPLOSION>', '<:dmg_blast:1179473703382298654>')
    .replaceAll('<DT_POISON>', '<:dmg_toxin:1179474604536905868>')
    .replaceAll('<DT_VIRAL>', '<:dmg_viral:1179474601051430982>')
    .replaceAll('<DT_CORROSIVE>', '<:dmg_corrosive:1179474612443160667>');
}
