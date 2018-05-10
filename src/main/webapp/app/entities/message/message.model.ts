import { BaseEntity, User } from './../../shared';

export class Message implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public url?: string,
        public description?: string,
        public fecha?: any,
        public imagenContentType?: string,
        public imagen?: any,
        public categories?: BaseEntity[],
        public author?: User,
        public parent?: BaseEntity,
    ) {
    }
}
