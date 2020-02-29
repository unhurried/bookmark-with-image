import { Column, PrimaryColumn } from 'typeorm';
import { ExtendedEntity } from '@/repository/ExtendedEntity';
import { BaseEntity } from './BaseEntity';

@ExtendedEntity('config')
export class ConfigEntity extends BaseEntity {
  @PrimaryColumn({ type: 'text', name: 'id' })
  id = 'config';

  @Column({ type: 'text', name: 'browserPath', nullable: true })
  browserPath?: string;

  @Column({ type: 'text', name: 'browserOption', nullable: true })
  browserOption?: string;
}
