import {Image} from './image';
import {BaseEntity} from './baseEntity';

export interface ProductOption extends BaseEntity {
  id?: number;
  productOptionDescription?: string;
  price: number;

  images?: Image[];
}
