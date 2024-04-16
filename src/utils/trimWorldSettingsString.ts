export default function trimWorldSettingsString(string: string) {
  return typeof string === 'string' ? string.replaceAll('"', '') : string;
}
