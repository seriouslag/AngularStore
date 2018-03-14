import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CartItem} from '../classes/cart-item';
import {ProductOption} from '../interfaces/productOption';

@Injectable()
export class CartService {

  public cart = new BehaviorSubject<CartItem[]>([]);

  constructor() { }

  addToCart(cartItem: CartItem) {
    const index = this.getIndexOf(cartItem.productOption);
    const cart = this.cart.getValue();
    if (index > -1) {
      cart[index].increase(cartItem.quantity);
    } else {
      cart.push(cartItem);
      this.cart.next(cart);
    }
  }

  removeFromCart(cartItem: CartItem) {
    const index = this.getIndexOf(cartItem.productOption);
    const cart = this.cart.getValue();
    if (index > -1) {
      cart[index].decrease(cartItem.quantity);
      if (cartItem[index].quantity <= 0) {
        cart.splice(index, 1);
      }
    }
  }

  getIndexOf(productOption: ProductOption): number {
    let index = 0;
    for (const cartItem of this.cart.getValue()) {
      if (cartItem.productOption.id === productOption.id) {
        return index;
      }
      index++;
    }
    return -1;
  }

}
