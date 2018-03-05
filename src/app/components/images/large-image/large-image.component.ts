import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-large-image',
  templateUrl: './large-image.component.html',
  styleUrls: ['./large-image.component.css']
})
export class LargeImageComponent implements OnInit {

  @Input()
  imageSrc: string;

  @ViewChild('player')
  private img: ElementRef;

  constructor() { }

  ngOnInit() {
  }

}
