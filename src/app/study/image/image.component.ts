import { Component, Input, OnInit } from '@angular/core';
import { ImageModel } from "../../models";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.less']
})
export class ImageComponent implements OnInit {

  @Input()
  image: ImageModel;

  constructor() { }

  ngOnInit() {
  }

}
