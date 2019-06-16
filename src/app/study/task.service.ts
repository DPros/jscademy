import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {progress, task} from "../routes";
import {Observable, Subject} from "rxjs";
import {pluck, scan, shareReplay, tap} from "rxjs/operators";

@Injectable()
export class TaskService {

  private progressSubject = new Subject<Record<number, boolean>>();
  private progress$: Observable<Record<number, boolean>> = this.progressSubject.pipe(
    scan((total, current) => ({...total, ...current}), {}),
    shareReplay(1)
  );

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

  getTask(id: string) {
    return this.http.get<TaskResultModel>(task, {params: new HttpParams().append("taskId", id)})
  }

  loadProgress(): void {
    this.http.get<{ correct: number[], incorrect: number[] }>(progress)
      .subscribe(({correct, incorrect}) => this.progressSubject.next(reduceWith(correct, true, reduceWith(incorrect, false))));
  }

  isTaskCorrect(id: number) {
    return this.progress$.pipe(
      pluck(id)
    )
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
