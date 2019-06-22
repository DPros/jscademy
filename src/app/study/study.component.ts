import { Component, OnInit } from '@angular/core';
import {TaskService} from "./task.service";
import {ConsoleService} from '../services/console.service';
import {activeTaskStateTrigger} from './animations';
import {MaterialsService} from '../services/materials.service';
import {distinctUntilChanged, map, pluck, skipWhile, switchMap, tap} from 'rxjs/internal/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {empty} from 'rxjs/internal/Observer';
import {from} from 'rxjs';

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
              private consoleService: ConsoleService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.taskService.loadProgress();
    from(this.router.events)
      .pipe(
        skipWhile(() => this.route.firstChild == null ),
        switchMap(() => this.route.firstChild.params),
        pluck('sectionId'),
        distinctUntilChanged()
      ).subscribe(id => this.sectionId = id);
  }
}
