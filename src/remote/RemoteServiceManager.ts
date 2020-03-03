import { RemoteServiceBase } from '@/remote/RemoteServiceBase';
import { BookmarkService } from '@/remote/service/BookmarkService';
import { ConfigService } from '@/remote/service/ConfigService';
import { BrowserService } from './service/BrowserService';

// Compliles all the RemoteServices classes into an object to be embedded in background.js (main process).
export default class RemoteServiceManager {
  private static services: typeof RemoteServiceBase[] = [ BookmarkService, ConfigService, BrowserService ];

  public static create(): { [key: string]: RemoteServiceBase } {
    const obj: { [key: string]: RemoteServiceBase } = {};
    for(const service of RemoteServiceManager.services) {
      obj[service.serviceName] = service;
    }
    return obj;
  }
}
