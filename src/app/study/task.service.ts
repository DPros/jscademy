import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {progress, task} from "../routes";
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {pluck, scan, shareReplay, tap} from "rxjs/operators";
import {find, mergeMap, switchMap, toArray} from 'rxjs/internal/operators';
import {TaskModel} from '../models';

@Injectable()
export class TaskService {

  private progressSubject = new Subject<Record<number, boolean>>();
  private progress$: Observable<Record<number, boolean>> = this.progressSubject.pipe(
    scan((total, current) => ({...total, ...current}), {}),
    shareReplay(1)
  );
  private tasksSubject = new Subject<TaskModel>();
  private $tasks: Observable<TaskModel> = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  saveTask(taskId: number, code: string, correct?: boolean) {
    const data: SaveTaskModel = {taskId, code, correct};
    return this.http.post(task, data).pipe(
      tap(() => {
        if (typeof correct === "boolean") {
          this.progressSubject.next({[taskId]: correct})
        }
      })
    );
  }

  fetchTasks(list: TaskModel[]) {
    return of(...list).pipe(
      mergeMap(t => this.getTask(`${t.taskId}`)),
      toArray()
    );
  }

  getTask(id: string) {
    return this.http.get<TaskResultModel>(task, {params: new HttpParams().append("taskId", id)})
  }

  loadProgress(): void {
    this.http.get<{ correct: number[], incorrect: number[] }>(progress)
      .subscribe(({correct, incorrect}) => this.progressSubject.next(reduceWith(correct, true, reduceWith(incorrect, false))));
  }

  isTaskCorrect(id: number) {
    return this.progress$.pipe(
      pluck(id),
      tap( (t) => console.log(t))
    )
  }

  fetchTask(taskId: number) {
    return this.$tasks
      .pipe(
        find((t: TaskModel) => t.taskId === taskId),
        tap(t => console.log(t))
        );
  }
}

function reduceWith(keys: number[], value: boolean, seed = {}) {
  return keys.reduce((acc, key) => (acc[key] = value, acc), seed);
}

export interface SaveTaskModel {
  taskId: number;
  code: string;
  correct?: boolean;
}

export interface TaskResultModel {
  correct: boolean | null;
  code: string;
}
