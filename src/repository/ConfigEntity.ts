import { Column, PrimaryColumn, Entity } from 'typeorm';

@Entity('config')
export class ConfigEntity {
  @PrimaryColumn({ type: 'text', name: 'id' })
  id = 'config';

  @Column({ type: 'text', name: 'browserPath', nullable: true })
  browserPath?: string;

  @Column({ type: 'text', name: 'browserOption', nullable: true })
  browserOption?: string;
}
