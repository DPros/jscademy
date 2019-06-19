import { Component, OnInit } from '@angular/core';
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

  constructor(private consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.$result.pipe(skip(1)).subscribe(result => {
      this.data.unshift(...result);
    });
  }

}
