import { Component, OnInit } from '@angular/core';
import {ConsoleService} from '../../services/console.service';
import {skip} from 'rxjs/internal/operators';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.less']
})
export class ConsoleComponent implements OnInit {

  data = [];

  constructor(private consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.$result.pipe(skip(1)).subscribe(result => {
      if (result === undefined)
        result = 'undefined';
      if (result === null)
        result = 'null';
      this.data.unshift(result);
    });
  }

}
