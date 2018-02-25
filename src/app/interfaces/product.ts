import {ProductOption} from "./productOption";
import {BaseEntity} from "./baseEntity";

export interface Product extends BaseEntity {
  id: number;
  productDescription?: string;

  productOptions: ProductOption[]
}
