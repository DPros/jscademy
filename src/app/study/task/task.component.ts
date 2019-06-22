import {Component, Input, OnInit} from '@angular/core';
import {TaskModel} from "../../models";
import {TaskService} from "../task.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {

  @Input()
  task: TaskModel;

  solving: boolean = false;
  correct$: Observable<boolean | undefined>;

  constructor(private taskService: TaskService) {
  }

  startSolving() {
    this.solving = true;
    this.taskService.fetchTask(this.task.taskId)
      .subscribe( t => this.task = t);
  }

  run() {
    let correct = false;
    try {
      correct = eval(`(${this.task.code})()`) == this.task.solution;
    } catch (e) {

    }
    const {taskId, code} = this.task;
    this.taskService.saveTask(taskId, code, correct);
  }

  ngOnInit(): void {
    this.correct$ = this.taskService.isTaskCorrect(this.task.taskId);
  }
}
