import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TaskModel } from "../models";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent {

  @Input()
  task: TaskModel;

  @ViewChild("codeArea", {static: true})
  codeArea: ElementRef<HTMLTextAreaElement>;

  constructor() {
  }

  run() {
    alert(eval(this.task.code) === this.task.solution);
  }
}
