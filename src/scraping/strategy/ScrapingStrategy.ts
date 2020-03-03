import { BookmarkEntity } from '@/repository/BookmarkEntity';

export interface ScrapingStrategy {
  accept(hostname: string): boolean;
  createBookmark(bookmarkUrl: string): Promise<BookmarkEntity>;
}
