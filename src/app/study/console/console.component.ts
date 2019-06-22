import {Component, HostListener, OnInit} from '@angular/core';
import {ConsoleMessageType, ConsoleService} from '../../services/console.service';
import {skip} from 'rxjs/internal/operators';


@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.less']
})
export class ConsoleComponent implements OnInit {
  Type = ConsoleMessageType;
  data = [];
  code = '';
  constructor(private consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.$result.pipe(skip(1)).subscribe(result => {
      this.code = '';
      this.data.unshift(...result);
    });
  }

  run(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.consoleService.runScript(this.code);
    }
  }
}
