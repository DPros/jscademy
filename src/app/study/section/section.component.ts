import { Component, OnInit } from '@angular/core';
import { SectionModel } from "../../models";
import { ActivatedRoute } from "@angular/router";
import {combineLatest, Observable} from 'rxjs';
import { pluck, switchMap } from "rxjs/operators";
import {ContentSection, MaterialsService} from '../../services/materials.service';
import {map, tap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.less']
})
export class SectionComponent implements OnInit {
  next$: Observable<ContentSection>;
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
    );

    this.next$ = combineLatest(this.studyService.getStructure(), this.route.params.pipe(pluck('sectionId')))
      .pipe(
        map( ([structure, currentSection])  => {
                  const sectionIndex = structure.findIndex(x => x.sectionId === +currentSection);

                  if (sectionIndex < structure.length - 1) {
                    return structure[sectionIndex + 1];
                  } else {
                    return null;
                  }
        })
      );

  }
}
