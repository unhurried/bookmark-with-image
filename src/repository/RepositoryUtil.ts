import { remote } from 'electron';
import { Repository } from 'typeorm';
import { RepositoryManager } from './RepositoryManager';
import { BaseEntity } from './BaseEntity';

// Intended to be used in renderer process of Electron.
export class RepositoryUtil {
  public static async getRepository<T extends BaseEntity>(repositoryClass: { new(): T }): Promise<Repository<T>> {
    const manager = await this.getRepositoryManager();
    return manager.getRepository(repositoryClass, new repositoryClass().entityName);
  }

  private static async getRepositoryManager(): Promise<RepositoryManager> {
    let remoteModule = null;
    try {
      remoteModule = remote.require('./background');
    } catch {
      remoteModule = remote.require('./index');
    }
    return remoteModule.RepositoryManager.getInstance();
  }
}
