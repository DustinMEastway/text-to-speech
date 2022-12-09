export interface PadStringProps {
  value: number | string;
  minLength: number;
}

export function padString({
  minLength,
  value
}: PadStringProps): string {
  value = value.toString();
  return '0'.repeat(Math.max(0, minLength - value.length)) + value;
}
