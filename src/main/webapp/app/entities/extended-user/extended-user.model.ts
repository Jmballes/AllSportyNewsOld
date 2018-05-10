import { BaseEntity } from './../../shared';

export class ExtendedUser implements BaseEntity {
    constructor(
        public id?: number,
    ) {
    }
}
