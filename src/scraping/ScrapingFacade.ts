import { ExampleStrategy } from '@/scraping/strategy/ExampleStrategy';
import { FallbackStrategy } from '@/scraping/strategy/FallbackStrategy';
import { ScrapingStrategy } from '@/scraping/strategy/ScrapingStrategy';
import { BookmarkEntity } from '@/repository/BookmarkEntity';
import { RepositoryUtil } from '@/repository/RepositoryUtil';

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
    bookmark.order = await this.getNewOrder();
    return bookmark;
  }

  private static async getNewOrder(): Promise<number> {
    const repository = await RepositoryUtil.getRepository(BookmarkEntity);
    const result = await repository.createQueryBuilder().select('MAX(`order`) as maxOrder').getRawOne();
    return result.maxOrder as number + 1;
  }
}
