import { Component, Input, OnInit } from '@angular/core';
import { TextModel } from "../../models";

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.less']
})
export class TextComponent implements OnInit {

  @Input()
  text: TextModel;

  constructor() {
  }

  ngOnInit() {
  }

}
