import {ProductOption} from '../interfaces/productOption';

export class CartItem {

  productOption: ProductOption;
  quantity: number;

  public CartItem(productOption: ProductOption, quantity?: number) {
    this.productOption = productOption;
    this.quantity = (quantity ? quantity : 1);
  }

  public increase(quantity: number) {
    this.quantity += (quantity ? quantity : 1);
  }

  public decrease(quantity: number) {
    this.quantity -= (quantity ? quantity : 1);
  }
}

