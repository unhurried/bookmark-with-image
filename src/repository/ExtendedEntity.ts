import { Entity } from 'typeorm';

// Decorator which extends @Entity so that name property can be refered in "entityName" member.
export function ExtendedEntity(param: string): Function {
    return function (constructor: Function) {
        constructor.prototype.entityName = param;
        Entity(param)(constructor);
    }
}
