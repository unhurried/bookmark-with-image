import { RemoteService } from '@/remote/RemoteService';
import { RemoteServiceBase } from '@/remote/RemoteServiceBase';
import { getRepository } from 'typeorm';
import { ConfigEntity } from '@/repository/ConfigEntity';

@RemoteService('config')
export class ConfigService extends RemoteServiceBase {
  public async findOne() {
    const repo = getRepository(ConfigEntity);
    return await repo.findOne('config');
  }

  public async save(entity: ConfigEntity) {
    const repo = getRepository(ConfigEntity);
    if(entity) await repo.save(entity);
  }
}