import { Component, OnInit } from '@angular/core';
import {TaskService} from "./task.service";

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.less']
})
export class StudyComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.loadProgress();
  }
}
