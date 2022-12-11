import { BookStatus } from './book-status';

/** Book to process. */
export interface Book {
  id: string;
  name: string;
  status: BookStatus;
}
