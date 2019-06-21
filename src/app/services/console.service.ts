import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskModel} from '../models';
import {TaskService} from '../study/task.service';
@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  private task = new BehaviorSubject(null);
  private clear = new BehaviorSubject(null);
  private code = new BehaviorSubject('');
  private result = new BehaviorSubject([]);
  private oldCode = '';

  public readonly $clearTextEditor: Observable<any> = this.clear.asObservable();
  public readonly $code: Observable<string> = this.code.asObservable();
  public readonly $task: Observable<TaskModel> = this.task.asObservable();
  public readonly $result: Observable<ConsoleMessage[]> = this.result.asObservable();

  constructor(private taskService: TaskService) {

  }


  public runScript(code: string): void {
    const {messages} = this.compute(code);
    this.result.next(messages);
  }

  public save(code: string, taskId: number = null, evaluate: boolean = null) {

    const task = this.task.getValue();
    if (task && taskId && task.taskId === taskId) {
      if (evaluate) {
        const success = this.isCorrect(code, task.solution);
        this.taskService.saveTask(taskId, code, success);
      } else {
        this.taskService.saveTask(taskId, code);
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
    const {result, messages} = this.compute(code);
    return  result === solution || solution === messages.map(x => x.value).join('\n');

  }

  private compute(code: string): ComputedResult {
    if (!code.trim()) {
      console.warn('empty code passed');
      return ComputedResult.EMPTY;
    }
    const resultMessages = [];
    const consoleLogFunction = console.log;
    const consoleErrorFunction = console.error;
    let result;
    let value;
    console.log = (x) => {
      resultMessages.unshift(new ConsoleMessage(x, ConsoleMessageType.LOG));
    };

    console.error = (e) => {
      resultMessages.unshift(new ConsoleMessage(e, ConsoleMessageType.ERROR));
    };

    try {
      value = eval(code.trim());
    } catch (e) {
    } finally {
      if (resultMessages.length === 0 || resultMessages.length > 0 && resultMessages[0].type !== ConsoleMessageType.LOG) {
        result = value;
        resultMessages.unshift(new ConsoleMessage(result, ConsoleMessageType.RESULT));
      }
    }
    console.log = consoleLogFunction;
    console.error = consoleErrorFunction;
    return new ComputedResult(result, resultMessages);
  }

}

class ComputedResult {
  constructor(public result: string, public messages: ConsoleMessage[]) {}
  static EMPTY = new ComputedResult(null, []);
}

export class ConsoleMessage {
  constructor(public value: string, public type: ConsoleMessageType) {}
}
export enum ConsoleMessageType {
  ERROR, LOG, WARN, RESULT
}
