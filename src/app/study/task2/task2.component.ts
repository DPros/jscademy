import {Component, Input, OnInit} from '@angular/core';
import {TaskModel} from '../../models';
import {TaskService} from '../task.service';
import {isBoolean} from 'util';
import {ConsoleService} from '../../services/console.service';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.less']
})
export class Task2Component implements OnInit {
  @Input() task: TaskModel;
  state: TaskState = TaskState.NEW;
  State = TaskState;

  constructor(private taskService: TaskService, private consoleService: ConsoleService) {
  }

  ngOnInit() {

    this.taskService.fetchTask(this.task.taskId).subscribe( t => {
      this.task = t;
      this.setState(this.task.correct);
      console.log(`id = ${this.task.taskId},TaskState: ${TaskState[this.state]}, service resp = ${this.task.correct}`);
    });

    this.consoleService.$task.subscribe( t => {
      if (!t || t.taskId !== this.task.taskId) {
        this.setState(this.task.correct);
      }
    });
  }

  run(): void {
    this.state = TaskState.ACTIVE;
    this.consoleService.setTask(this.task);
  }

  resume(): void {
    this.run();
  }


  private setState(status: boolean | undefined): void {
    if (status === undefined || status === null) {
      if (this.task.code) {
        this.state = TaskState.PAUSED;
      } else {
        this.state = TaskState.NEW;
      }
    } else {
      this.state = isBoolean(status) && status ? TaskState.SUCCEED : TaskState.FAILED;
    }
  }

}
enum TaskState {
  ACTIVE, PAUSED, SUCCEED, FAILED, NEW
}
