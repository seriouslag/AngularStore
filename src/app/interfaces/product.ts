import {ProductOption} from "./productOption";
import {BaseEntity} from "./baseEntity";
import {Tag} from "./tag";

export interface Product extends BaseEntity {
  id?: number;
  productDescription?: string;

  productOptions: ProductOption[];
  tags: Tag[];
}
