import {Component, Input, OnInit} from '@angular/core';
import {ContentSection, MaterialsService} from '../../services/materials.service';
import {structureStateTrigger} from '../animations';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-content-structure',
  templateUrl: './content-structure.component.html',
  styleUrls: ['./content-structure.component.less'],
  animations: [structureStateTrigger]
})
export class ContentStructureComponent implements OnInit {
  @Input() currentSectionId: number;
  sections = [];
  $sectionContent: Observable<ContentSection> = this.materialsService.$sectionContent
  constructor(private materialsService: MaterialsService) { }

  ngOnInit() {

    this.materialsService.getStructure().subscribe((sections: ContentSection[]) => {
      this.sections = sections;
    });
  }

}
