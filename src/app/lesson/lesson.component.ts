import { Component, Input } from '@angular/core';
import { LessonModel } from "../models";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.less']
})
export class LessonComponent {

  @Input()
  lesson: LessonModel;

  constructor() {
  }
}
