import { Column, Index, PrimaryColumn, Entity } from 'typeorm';

@Entity('bookmark')
export class BookmarkEntity {
  @PrimaryColumn({ type: 'text', name: 'url' })
  url!: string;

  @Index()
  @Column({ type: 'integer', name: 'order' })
  order: number = 0;

  @Column({ type: 'text', name: 'title', nullable: true })
  title!: string;

  @Column({ type: 'text', name: 'thumbnailUrl', nullable: true })
  thumbnailUrl?: string;

  @Column({ type: 'text', name: 'thumbnail', nullable: true })
  thumbnailData?: string;

  @Column({ type: 'text', name: 'thumbnailExt', nullable: true })
  thumbnailExt?: string;
}
