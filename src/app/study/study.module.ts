import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SectionComponent} from "./section/section.component";
import {ImageComponent} from "./image/image.component";
import {LessonComponent} from "./lesson/lesson.component";
import {TaskComponent} from "./task/task.component";
import {TextComponent} from "./text/text.component";
import {MatButtonModule, MatSidenavModule} from '@angular/material';
import {StudyComponent} from "./study.component";
import {AceEditorModule} from "ng2-ace-editor";
import {AuthGuard} from "../services/auth.guard";
import {TaskService} from "./task.service";
import { CodeComponent } from './code/code.component';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { ConsoleComponent } from './console/console.component';
import { ActiveTaskComponent } from './active-task/active-task.component';

const routes: Routes = [
  {
    path: "study", component: StudyComponent, canActivate: [AuthGuard], children: [
      {path: ":sectionId", component: SectionComponent}
    ],
  },
];

@NgModule({
  declarations: [
    ImageComponent,
    LessonComponent,
    SectionComponent,
    TaskComponent,
    TextComponent,
    StudyComponent,
    CodeComponent,
    CodeEditorComponent,
    ConsoleComponent,
    ActiveTaskComponent,
  ],
  imports: [
    AceEditorModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    ScrollDispatchModule,
    MatButtonModule
  ],
  providers: [
    TaskService
  ]
})
export class StudyModule {

}
