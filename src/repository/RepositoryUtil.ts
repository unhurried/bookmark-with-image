import { remote } from 'electron';
import { Repository, Entity } from 'typeorm';
import { RepositoryManager } from './RepositoryManager';
import { BaseEntity } from './BaseEntity';

// Intended to be used in renderer process of Electron.
export class RepositoryUtil {
  public static async getRepository<T extends BaseEntity>(repositoryClass: { new(): T }): Promise<Repository<T>> {
    let remoteModule;
    try {
      remoteModule = remote.require('./background');
    } catch {
      remoteModule = remote.require('./index');
    }
    const manager: RepositoryManager = await remoteModule.RepositoryManager.getInstance();
    return manager.getRepository(repositoryClass, new repositoryClass().entityName);
  }
}
