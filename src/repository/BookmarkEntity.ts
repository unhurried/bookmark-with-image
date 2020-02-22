import { Column } from 'typeorm';
import { ExtendedEntity } from '@/repository/ExtendedEntity';
import { BaseEntity } from './BaseEntity';

@ExtendedEntity('bookmark')
export class BookmarkEntity extends BaseEntity {
  @Column({ type: 'text', name: 'bookmarkUrl' })
  url!: string;

  @Column({ type: 'text', name: 'title', nullable: true })
  title!: string;

  @Column({ type: 'text', name: 'thumbnailUrl', nullable: true })
  thumbnailUrl?: string;

  @Column({ type: 'text', name: 'thumbnail', nullable: true })
  thumbnailData?: string;

  @Column({ type: 'text', name: 'thumbnailExt', nullable: true })
  thumbnailExt?: string;
}
