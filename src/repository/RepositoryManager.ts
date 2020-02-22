'use strict'

import { createConnection, Connection, Repository } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { BookmarkEntity } from '@/repository/BookmarkEntity';
import { ConfigEntity } from '@/repository/ConfigEntity';

// Intended to be used in main process of Electron.
export class RepositoryManager {
  public static storageDir: string;
  private static entities: ({ new(): BaseEntity } & Function)[] = [ BookmarkEntity, ConfigEntity ];

  // Singleton Pattern
  private static instance: RepositoryManager;
  private constructor(private connection: Connection, private entityMap: Map<string, Function>) {}
  public static async getInstance(): Promise<RepositoryManager> {
    if (!this.instance) {
      this.instance = await RepositoryManager.createInstance();
    }
    return this.instance;
  }
  private static async createInstance() {
    const entityMap: Map<string, Function> = new Map();
    for(const entity of RepositoryManager.entities) {
      entityMap.set(new entity().entityName, entity);
    }

    const connection = await createConnection({
      type: "sqlite",
      database: this.storageDir? `${this.storageDir}/data.db` : './data.db',
      synchronize: true,
      entities: Array.from(entityMap.values()) 
    });

    return new RepositoryManager(connection, entityMap);
  }

  public getRepository<T>(entityClass: { new(): T }, entityName: string): Repository<T> {
    const entity = this.entityMap.get(entityName);
    if (!entity) {
      throw new Error(`Requested entity is not registered. entityName=${entityName}`);
    }
    return (this.connection.getRepository(entity)) as any;
  }
}
