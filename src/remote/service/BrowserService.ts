import { exec } from 'child_process';
import electron from 'electron';
import { RemoteService } from '@/remote/RemoteService';
import { RemoteServiceBase } from '@/remote/RemoteServiceBase';
import { RemoteServiceFactory } from '@/remote/RemoteServiceFactory';
import { ConfigService } from '@/remote/service/ConfigService';

@RemoteService('browser')
export class BrowserService extends RemoteServiceBase {
  private configService = new ConfigService();

  public async openUrl(url: string) {
    const entity = await this.configService.findOne();
    if (entity && entity.browserPath && entity.browserPath.length > 0) {
      let command = `"${entity.browserPath}" ${entity.browserOption} ${url}`;
      exec(command);
    } else {
      electron.shell.openExternal(url);
    }
  }
}
