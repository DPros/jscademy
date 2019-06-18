import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskModel} from '../models';
import {TaskService} from '../study/task.service';
import {tryCatch} from 'rxjs/internal/util/tryCatch';

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

  constructor(private taskService: TaskService) { }


  public runScript(code: string): void {
    // TODO run code from editor in console maybe call compute() and then just show
  }

  public save(code: string, taskId: number = null, evaluate: boolean = null) {

    const task = this.task.getValue();
    if (task && taskId && task.taskId === taskId) {
      if(evaluate){
        const success = this.isCorrect(code, task.solution);
        this.taskService.saveTask(taskId, code, success);
      }else{
        this.taskService.saveTaskCode(taskId, code);
      }

    }
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

  private isCorrect(code: string, solution: string): boolean {

    return this.compute(code ) === solution;

  }

  private compute(code: string): string {
    let result = null;

    try{
      result = eval(`(${code})()`);
    } catch (e) {

    }

    return result;
  }
}
