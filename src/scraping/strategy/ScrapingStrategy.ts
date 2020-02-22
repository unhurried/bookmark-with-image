import { BookmarkEntity } from '@/repository/BookmarkEntity';

export interface ScrapingStrategy {
  accept(hostname: string): boolean;
  getBookmarkId(bookmarkUrl: string): string;
  createBookmark(bookmarkUrl: string): Promise<BookmarkEntity>;
};
