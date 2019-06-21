import { Component, OnInit } from '@angular/core';
import {TaskService} from "./task.service";
import {ConsoleService} from '../services/console.service';
import {activeTaskStateTrigger} from './animations';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.less'],
  animations: [activeTaskStateTrigger]
})
export class StudyComponent implements OnInit {

  constructor(private taskService: TaskService, private consoleService: ConsoleService) { }

  $activeTask = this.consoleService.$task;

  ngOnInit() {
    this.taskService.loadProgress();
  }
}
