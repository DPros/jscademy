import { Component, Input, OnInit } from '@angular/core';
import { LessonModel } from "../models";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.less']
})
export class LessonComponent implements OnInit {

  @Input()
  lesson: LessonModel;

  constructor() {
  }

  ngOnInit() {
    console.log(this.lesson);
  }
}
