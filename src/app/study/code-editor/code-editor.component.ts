import {Component, Input, OnInit} from '@angular/core';
import {ConsoleService} from '../../services/console.service';
import {skipWhile} from 'rxjs/internal/operators';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.less']
})
export class CodeEditorComponent implements OnInit {

  @Input() code: string;
  taskId: any;

  constructor(private consoleService: ConsoleService) { }

  ngOnInit() {

    this.consoleService.$code.subscribe(code => {
      this.code = code ? code : '';
    });

    this.consoleService.$task
      .subscribe(task => {
        if (task) {
          this.code = task.code;
          this.taskId = task.taskId;
        } else {
          this.code = '';
          this.taskId = null;
        }
      });
  }

  run(): void {
    this.consoleService.runScript(this.code);
  }

  private save(): void {
    this.consoleService.save(this.code, this.taskId);
    this.code = '';
    this.taskId = null;
  }

  cancelTask(): void {
    this.save();
    this.consoleService.cancelTask();
  }

  evaluate(): void {
    this.consoleService.save(this.code, this.taskId, true);
    this.consoleService.cancelTask();
  }
}
