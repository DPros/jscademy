import {Component, Input, OnInit} from '@angular/core';
import {TaskModel} from '../../models';
import {TaskService} from '../task.service';
import {isBoolean} from 'util';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.less']
})
export class Task2Component implements OnInit {
  @Input() task: TaskModel;
  state: TaskState = TaskState.NEW;
  State = TaskState;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {

    this.taskService.fetchTask(this.task.taskId).subscribe( t => {
      this.task = t;
    });

    this.taskService.isTaskCorrect(this.task.taskId).subscribe( status => {
      this.setState(status);

      console.log(`id = ${this.task.taskId},TaskState: ${TaskState[this.state]}, service resp = ${status}`);
    });
  }

  run(): void {
    this.state = TaskState.ACTIVE;
    // TODO run service to start task
  }

  resume(): void {
    this.run();
  }

  isActive(): boolean {
    return false;
  }

  private setState(status: boolean | undefined): void {
    if (status === undefined) {
      if (this.task.code) {
        this.state = TaskState.PAUSED;
      } else if (this.isActive()) {
        this.state = TaskState.ACTIVE;
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
