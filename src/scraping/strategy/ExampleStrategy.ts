import { ScrapingStrategy } from './ScrapingStrategy';
import { FallbackStrategy } from './FallbackStrategy';

export class ExampleStrategy implements ScrapingStrategy {
  public accept(bookmarkUrl: string) {
    const parsed = new URL(bookmarkUrl);
    return parsed.hostname === 'www.example.com';
  }
 
  async createBookmark(bookmarkUrl: string) {
    // You can customize the scraping process.
    return new FallbackStrategy().createBookmark(bookmarkUrl);
  }
}
