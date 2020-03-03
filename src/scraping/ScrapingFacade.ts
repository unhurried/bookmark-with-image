import { ExampleStrategy } from '@/scraping/strategy/ExampleStrategy';
import { FallbackStrategy } from '@/scraping/strategy/FallbackStrategy';
import { ScrapingStrategy } from '@/scraping/strategy/ScrapingStrategy';
import { RemoteServiceFactory } from '@/remote/RemoteServiceFactory';
import { BookmarkService } from '../remote/service/BookmarkService';
import { BookmarkEntity } from '@/repository/BookmarkEntity';

export class ScrapeFacade {
  private static strategies: ScrapingStrategy[] = [ new ExampleStrategy() ];

  private static findStategy(url: string): ScrapingStrategy | null {
    for(const strategy of this.strategies) {
      if(strategy.accept(url)) return strategy;
    }
    return new FallbackStrategy();
  }

  static async createBookmark(url: string): Promise<BookmarkEntity> {
    const strategy = this.findStategy(url);
    if(!strategy) { throw new Error('No scraping strategy found.'); }
    const bookmark = await strategy.createBookmark(url);
    const bookmarkService = RemoteServiceFactory.getModule(BookmarkService);
    bookmark.order = await bookmarkService.getNewOrder();
    return bookmark;
  }
}
