export interface Environment {
  batchSize: {
    /** Amount of books to convert audio for at once. */
    bookAudio: number;
    /** Amount of books to convert text for at once. */
    bookText: number;
    /** Amount of chapters to convert audio for at once. */
    chapterAudio: number;
    /** Amount of chapters to convert text for at once. */
    chapterText: number;
  };
}
