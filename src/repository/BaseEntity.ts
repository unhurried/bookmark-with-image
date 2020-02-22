import { PrimaryColumn } from 'typeorm';

export abstract class BaseEntity {
  // A field that name property of @ExtendedEntity will be copied to.
  // Used for the conversion between an Entity and a string representation.
  entityName!: string;

  @PrimaryColumn({ type: 'text', name: 'id' })
  id!: string;
}
