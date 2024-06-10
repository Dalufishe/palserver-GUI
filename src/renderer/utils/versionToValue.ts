export default function versionToValue(
  /* 例: 3.4.5  */
  version: string,
) {
  return Number(
    version
      .split('.')
      .map((v) => v.padStart(3, '0'))
      .join(''),
  );
}
