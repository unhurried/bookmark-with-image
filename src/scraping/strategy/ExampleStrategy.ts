import electron from 'electron';
import { AxiosStatic } from 'axios';
const axios: AxiosStatic = electron.remote.require('axios');
import { ScrapingStrategy } from './ScrapingStrategy';
import { FallbackStrategy } from './FallbackStrategy';
import { BookmarkEntity } from '@/repository/BookmarkEntity';

export class ExampleStrategy implements ScrapingStrategy {
  public accept(bookmarkUrl: string) {
    const parsed = new URL(bookmarkUrl);
    return parsed.hostname === 'www.example.com';
  }

  getBookmarkId(bookmarkUrl: string) {
    // You can customize the scraping process.
    return new FallbackStrategy().getBookmarkId(bookmarkUrl);
  }
  
  async createBookmark(bookmarkUrl: string) {
    // You can customize the scraping process.
    return new FallbackStrategy().createBookmark(bookmarkUrl);
  }
}
