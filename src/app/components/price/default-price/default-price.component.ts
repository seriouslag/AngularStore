import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-default-price',
  templateUrl: './default-price.component.html',
  styleUrls: ['./default-price.component.css']
})
export class DefaultPriceComponent implements OnInit {

  @Input()
  price: number;

  constructor() { }

  ngOnInit() {
  }

}
