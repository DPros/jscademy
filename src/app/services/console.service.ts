import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {TaskModel} from '../models';
import {TaskService} from '../study/task.service';
import {shareReplay} from 'rxjs/internal/operators';
@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  private currentTask: TaskModel;
  private task = new ReplaySubject<TaskModel>(1);
  private code = new BehaviorSubject('');
  private result = new BehaviorSubject([]);
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
    const task = this.currentTask;
    if (taskId) {
      if (evaluate) {
        const success = this.isCorrect(code, task.solution);
        this.taskService.saveTask(taskId, code, success);
        this.cancelTask();
      } else {
        this.taskService.saveTask(taskId, code);
      }

    }
  }

  public setTask(task: TaskModel): void {
    this.task.next(task);
    this.currentTask = task;
  }

  public cancelTask(): void {
    this.task.next(null);
    this.currentTask = null;
  }

  public setCode(code: string): void {
    if (!this.currentTask)
      this.code.next(code);
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

  private cleanFromLogs(code: string): string {
    return code.replace(/console.(log|error|warn)\([\s'"\w\d_.,]*\)/, '');
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
