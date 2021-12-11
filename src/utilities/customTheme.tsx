export const cacheImages = async (srcArray: Array<string>) => {
  const promises = await srcArray.map((src: string) => new Promise((resolve, reject) => {
    const img = new Image();

    img.src = src;
    img.onload = () => resolve(true);
    img.onerror = () => reject();
  }));

  await Promise.all(promises);
};

export function RGBToRGBA (rgb: any, alpha: any) {
  const sep = rgb.indexOf(',') > -1 ? ',' : ' ';
  const result = rgb.substr(4).split(')')[0].split(sep);

  return `rgba(${result[0]},${result[1]},${result[2]},${alpha})`;
}
