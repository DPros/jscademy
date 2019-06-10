import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionComponent } from './section/section.component';
import { TextComponent } from './text/text.component';
import { TaskComponent } from './task/task.component';
import { ImageComponent } from './image/image.component';
import { LessonComponent } from './lesson/lesson.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth.guard";
import { MatSidenavModule, MatToolbarModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AceEditorModule } from "ng2-ace-editor";

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    TextComponent,
    TaskComponent,
    ImageComponent,
    LessonComponent,
    LoginComponent
  ],
  imports: [
    AceEditorModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
