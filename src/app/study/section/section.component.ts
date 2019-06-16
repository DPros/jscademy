import { Component, OnInit } from '@angular/core';
import { SectionModel } from "../../models";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { pluck, switchMap } from "rxjs/operators";
import { MaterialsService } from "../../services/materials.service";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.less']
})
export class SectionComponent implements OnInit {

  section$: Observable<SectionModel>;

  constructor(
    private route: ActivatedRoute,
    private studyService: MaterialsService
  ) {
  }

  ngOnInit() {
    this.section$ = this.route.params.pipe(
      pluck('sectionId'),
      switchMap((id: string) => this.studyService.getSection(id))
    )
  }
}
