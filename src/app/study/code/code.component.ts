import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {CodeModel} from "../../models";
import {AceEditorComponent} from 'ng2-ace-editor';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.less']
})
export class CodeComponent{
  @Input()
  code: CodeModel;


  lines(code: CodeModel) {
    let result = 3;
    if (code.code) {
      const lines = code.code.split('\n').length + 1;
      if (lines > result ) {
        result = lines;
      }
    }
    return result;
  }
}
