import {Component, Input, OnInit} from '@angular/core';
import { LessonModel } from "../../models";
import {Observable} from "rxjs";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.less']
})
export class LessonComponent {

  @Input()
  lesson: LessonModel;

  taskResults: Observable<{correct: number[], incorrect: number[]}>;

  constructor(private taskService: TaskService) {
  }
}
