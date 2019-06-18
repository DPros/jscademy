import {Component, Input, OnInit} from '@angular/core';
import {ConsoleService} from '../../services/console.service';
import {skip, skipWhile} from 'rxjs/internal/operators';

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
    this.consoleService.$clearTextEditor
      .subscribe(() => this.save());

    this.consoleService.$code.subscribe(code => {
      this.save();
      this.code = code ? code : '';
    });

    this.consoleService.$task
      .pipe(skipWhile(value => value == null))
      .subscribe(task => {
        this.save();
        this.code = task.code;
        this.taskId = task.taskId;
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

}
