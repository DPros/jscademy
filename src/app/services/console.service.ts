import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskModel} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  private task = new BehaviorSubject(null);
  private clear = new BehaviorSubject(null);
  private code = new BehaviorSubject('');


  public readonly $clearTextEditor: Observable<any> = this.clear.asObservable();
  public readonly $code: Observable<string> = this.code.asObservable();
  public readonly $task: Observable<TaskModel> = this.task.asObservable();

  constructor() { }


  public runScript(code: string): void {
    // TODO run code from editor in console
  }

  public save(code: string, taskId: number = null) {
    // TODO save somehow the progress
  }

  public setTask(task: TaskModel): void {
    this.task.next(task);
  }

  public setCode(code: string): void {
    this.code.next(code);
  }

  public clearEditor(): void {
    this.clear.next(null);
  }
}
