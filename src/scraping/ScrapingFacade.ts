import { ExampleStrategy } from '@/scraping/strategy/ExampleStrategy';
import { FallbackStrategy } from '@/scraping/strategy/FallbackStrategy';
import { ScrapingStrategy } from '@/scraping/strategy/ScrapingStrategy';
import { BookmarkEntity } from '@/repository/BookmarkEntity';

export class ScrapeFacade {
  private static strategies: ScrapingStrategy[] = [ new ExampleStrategy() ];

  private static findStategy(url: string): ScrapingStrategy | null {
    for(const strategy of this.strategies) {
      if(strategy.accept(url)) return strategy;
    }
    return new FallbackStrategy();
  }

  static getBookmarkId(url: string) {
    const strategy = this.findStategy(url);
    if(strategy) return strategy.getBookmarkId(url);
  }

  static async createBookmark(url: string): Promise<BookmarkEntity | undefined> {
    const strategy = this.findStategy(url);
    if(strategy) return strategy.createBookmark(url);
  }
}
