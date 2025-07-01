// Lógica para cortar la descripción respetando los saltos de línea originales,
// pero si ninguna línea cabe, corta por palabras hasta 80 caracteres
export default function splitDescriptionByLinesOrWords(
  text: string,
  maxTotalLength: number
) {
  const originalLines = text.split("\n");
  let lines: string[] = [];
  let totalLength = 0;
  let foundShortLine = false;
  for (let line of originalLines) {
    if (line.length <= maxTotalLength) {
      foundShortLine = true;
    }
    if (totalLength + line.length > maxTotalLength) {
      break;
    }
    lines.push(line);
    totalLength += line.length + 1; // +1 por el salto de línea
  }
  // Si no hay ninguna línea corta, cortar por palabras
  if (!foundShortLine && originalLines.length > 0) {
    const words = originalLines[0]?.split(/\s+/);
    let acc = "";
    for (let word of words || []) {
      if ((acc + (acc ? " " : "") + word).length > maxTotalLength) break;
      acc += (acc ? " " : "") + word;
    }
    return acc ? [acc] : [];
  }
  return lines;
}
