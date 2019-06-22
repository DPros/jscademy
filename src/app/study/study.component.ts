import { Component, OnInit } from '@angular/core';
import {TaskService} from "./task.service";
import {ConsoleService} from '../services/console.service';
import {activeTaskStateTrigger} from './animations';
import {MaterialsService} from '../services/materials.service';
import {pluck, tap} from 'rxjs/internal/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.less'],
  animations: [activeTaskStateTrigger]
})
export class StudyComponent implements OnInit {
  $activeTask = this.consoleService.$task;
  sectionId;

  constructor(private taskService: TaskService,
              private consoleService: ConsoleService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.taskService.loadProgress();

    this.route.firstChild.params.pipe(
      pluck('sectionId'),
      tap(console.log)).subscribe( id => this.sectionId = id);
  }
}
