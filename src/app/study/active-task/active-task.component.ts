import {Component, Input, OnInit} from '@angular/core';
import {TaskModel} from '../../models';

@Component({
  selector: 'app-active-task',
  templateUrl: './active-task.component.html',
  styleUrls: ['./active-task.component.less']
})
export class ActiveTaskComponent implements OnInit {

  @Input() task: TaskModel;

  constructor() { }

  ngOnInit() {
  }

}
