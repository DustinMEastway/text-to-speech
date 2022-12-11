/** Status of a book being processed. */
export enum BookStatus {
  queued,
  converted,
  convertingText,
  convertingAudio,
  failed
}
