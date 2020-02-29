import electron from 'electron';
import { AxiosStatic } from 'axios';
const axios: AxiosStatic = electron.remote.require('axios');
const client =  electron.remote.require('cheerio-httpcli');
import path from 'path';
import normalizeUrl from 'normalize-url';
import { ScrapingStrategy } from './ScrapingStrategy';
import { BookmarkEntity } from '@/repository/BookmarkEntity';

export class FallbackStrategy implements ScrapingStrategy {
  public accept(bookmarkUrl: string) {
    return true;
  }
 
  async createBookmark(bookmarkUrl: string) {
    const b = new BookmarkEntity();
    b.url = normalizeUrl(bookmarkUrl);
    const content = await client.fetch(bookmarkUrl);
    b.thumbnailUrl = content.$('meta[property="og:image"]').attr('content');
    b.title = content.$('meta[property="og:title"]').attr('content');
    if (!b.title) b.title = content.$('title').attr('content');
    b.thumbnailExt = b.thumbnailUrl? path.extname(b.thumbnailUrl).slice(1) : undefined;
    const thumbnailBinary = b.thumbnailUrl? (await axios.get(b.thumbnailUrl, { responseType: 'arraybuffer' })).data : undefined;
    b.thumbnailData = thumbnailBinary? new Buffer(thumbnailBinary).toString('base64') : undefined;
    return b;
  }
}
