import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import {SectionModel, TaskModel} from '../models';
import { catchError } from "rxjs/operators";
import {map, mapTo, mergeMap, pluck, switchMap, tap, toArray} from 'rxjs/internal/operators';
import {TaskService} from '../study/task.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor(
    private http: HttpClient, private taskService: TaskService
  ) {
  }

  getSection(name: string): Observable<SectionModel> {
    return this.http.get<SectionModel>(`/assets/content/${name}.json`).pipe(
      tap((section: SectionModel) => this.retrieveTasks(section)),
      catchError(() => of(undefined))
    );
  }

  retrieveTasks(section: SectionModel) {

    of (...section.lessons)
      .pipe(
        mergeMap(lesson => lesson.items.filter(item => item.type === 'task')),
        toArray(),
        switchMap((tasks: TaskModel[]) => this.taskService.fetchTasks(tasks))
      ).subscribe();

  }

}
