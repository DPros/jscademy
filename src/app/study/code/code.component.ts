import {Component, Input} from '@angular/core';
import {CodeModel} from "../../models";

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.less']
})
export class CodeComponent {

  @Input()
  code: CodeModel;
}
