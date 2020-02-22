import electron from 'electron';
const exec = electron.remote.require('child_process').exec;
import { RepositoryUtil } from '@/repository/RepositoryUtil';
import { ConfigEntity } from '@/repository/ConfigEntity';

export class BrowserUtil {
  static async openUrl(url: string) {
    const repository = await RepositoryUtil.getRepository(ConfigEntity);
    const entity = await repository.findOne('config');
    if (entity && entity.browserPath && entity.browserPath.length > 0) {
      let command = `"${entity.browserPath}" ${entity.browserOption} ${url}`;
      exec(command);
    } else {
      electron.shell.openExternal(url);
    }
  }
}
