export const cacheImages = async (srcArray: Array<string>) => {
  const promises = await srcArray.map((src: string) => new Promise((resolve, reject) => {
    const img = new Image();

    img.src = src;
    img.onload = () => resolve(true);
    img.onerror = () => reject();
  }));

  await Promise.all(promises);
};

export function RGBToHex (rgb: any) {
  const sep = rgb.indexOf(',') > -1 ? ',' : ' ';
  const resultedRgb = rgb.substr(4).split(')')[0].split(sep);

  let r = (+resultedRgb[0]).toString(16);
  let g = (+resultedRgb[1]).toString(16);
  let b = (+resultedRgb[2]).toString(16);

  if (r.length === 1) { r = `0${r}`; }
  if (g.length === 1) { g = `0${g}`; }
  if (b.length === 1) { b = `0${b}`; }

  return `#${r}${g}${b}`;
}

export function RGBToRGBA (rgb: any, alpha: any) {
  const sep = rgb.indexOf(',') > -1 ? ',' : ' ';
  const resultedRgb = rgb.substr(4).split(')')[0].split(sep);

  return `rgba(${resultedRgb[0]},${resultedRgb[1]},${resultedRgb[2]},${alpha})`;
}
