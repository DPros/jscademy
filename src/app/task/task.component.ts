import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TaskModel } from "../models";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {

  @Input()
  task: TaskModel;

  @ViewChild("codeArea", {static: true})
  codeArea: ElementRef<HTMLTextAreaElement>;

  constructor() {
  }

  ngOnInit() {
  }

}
