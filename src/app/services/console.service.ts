import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskModel} from '../models';
import {TaskService} from '../study/task.service';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  private readonly empty_string = '!%$empty';
  private task = new BehaviorSubject(null);
  private clear = new BehaviorSubject(null);
  private code = new BehaviorSubject('');
  private result = new BehaviorSubject('');
  private oldCode = '';

  public readonly $clearTextEditor: Observable<any> = this.clear.asObservable();
  public readonly $code: Observable<string> = this.code.asObservable();
  public readonly $task: Observable<TaskModel> = this.task.asObservable();
  public readonly $result: Observable<string> = this.result.asObservable();

  constructor(private taskService: TaskService) {

  }


  public runScript(code: string): void {
    const result = this.compute(code);
    if (this.empty_string !== result)
      this.result.next(result);
  }

  public save(code: string, taskId: number = null, evaluate: boolean = null) {

    const task = this.task.getValue();
    if (task && taskId && task.taskId === taskId) {
      if(evaluate){
        const success = this.isCorrect(code, task.solution);
        this.taskService.saveTask(taskId, code, success);
      } else {
        this.taskService.saveTaskCode(taskId, code);
        this.code.next(this.oldCode);
      }

    }
  }

  public setTask(task: TaskModel): void {
    this.oldCode = this.code.getValue();
    this.task.next(task);
  }


  public clearEditor(): void {
    this.oldCode = '';
    this.clear.next(null);
  }

  private isCorrect(code: string, solution: string): boolean {
    const result = this.compute(code);
    if (this.empty_string !== result)
      this.result.next(result);
    return  result === solution;

  }

  private compute(code: string): string {
    let result = null;
    const consoleLogFunction = console.log;
    console.log = (x) => {
      if (x) {
        this.result.next(x);
      }
    };
    try{
      result = eval(code);
    } catch (e) {
      console.error(e);
    }
    console.log = consoleLogFunction;

    const arr = code.split('\n');
    if (arr[arr.length - 1].match(/\s+/) || arr[arr.length - 1] === '') {
      result = this.empty_string;
    }

    return result;
  }

}
