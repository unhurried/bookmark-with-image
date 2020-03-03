import { getRepository } from 'typeorm';
import { BookmarkEntity } from '@/repository/BookmarkEntity';
import { RemoteServiceBase } from '@/remote/RemoteServiceBase';
import { RemoteService } from '@/remote/RemoteService';

@RemoteService('bookmark')
export class BookmarkService extends RemoteServiceBase {
  public async getList() {
    const repo = getRepository(BookmarkEntity);
    const items = await repo.find({ order: { order: "ASC" }});
    items.forEach((item, index) => {
      item.order = index + 1;
      repo.save(item);
    });
    return items;
  }

  public async getNewOrder(): Promise<number> {
    const repository = await getRepository(BookmarkEntity);
    const result = await repository.createQueryBuilder().select('MAX(`order`) as maxOrder').getRawOne();
    return result.maxOrder as number + 1;
  }

  public async save(entity: BookmarkEntity) {
    const repo = getRepository(BookmarkEntity);
    if(entity) await repo.save(entity);
  }

  public async move(entity: BookmarkEntity, direction: 'left' | 'right') {
    const repo = getRepository(BookmarkEntity);
    const dstOrder = direction === 'left'? entity.order - 1 : entity.order + 1;
    const src = await repo.findOne(entity.url);
    const dst = await repo.findOne({ order: dstOrder });
    if (!src || !dst) { return; }
    src.order = dst.order;
    dst.order = entity.order;
    await Promise.all([ repo.save(src), repo.save(dst) ]);
  }

  public async delete(entity: BookmarkEntity) {
    const repo = getRepository(BookmarkEntity);
    repo.delete(entity.url);
  }
}