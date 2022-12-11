export interface PadStringProps {
  /** Value to pad unp to @see minLength long. */
  value: number | string;
  /** Minimum acceptable length to pad @see value up to. */
  minLength: number;
}

/** Pad the provded value with '0' until it is @see minLength long. */
export function padString({
  minLength,
  value
}: PadStringProps): string {
  value = value.toString();
  return '0'.repeat(Math.max(0, minLength - value.length)) + value;
}
