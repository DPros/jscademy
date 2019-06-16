import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TaskModel} from "../../models";
import {TaskService} from "../task.service";
import {AceEditorComponent} from "ng2-ace-editor";
import {Observable} from "rxjs";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {

  @Input()
  task: TaskModel;

  @ViewChild("ace-editor", {static: false})
  aceEditor: ElementRef<AceEditorComponent>;

  solving: boolean = false;
  correct$: Observable<boolean | undefined>;

  constructor(private taskService: TaskService) {
  }

  startSolving() {
    this.solving = true;
    this.taskService.getTask(this.task.taskId.toString())
      .subscribe(({code, correct}) => {
        this.task.code = code;
      });
  }

  run() {
    let correct = false;
    try {
      correct = eval(`(${this.task.code})()`) == this.task.solution;
    } catch (e) {

    }
    const {taskId, code} = this.task;
    this.taskService.saveTask(taskId, code, correct).subscribe();
  }

  ngOnInit(): void {
    this.correct$ = this.taskService.isTaskCorrect(this.task.taskId);
  }
}
