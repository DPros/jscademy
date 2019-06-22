import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of, ReplaySubject} from 'rxjs';
import {SectionModel, TaskModel} from '../models';
import { catchError } from "rxjs/operators";
import {map, mapTo, mergeMap, pluck, switchMap, tap, toArray} from 'rxjs/internal/operators';
import {TaskService} from '../study/task.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  private sectionContent = new ReplaySubject<ContentSection>(1);
  public readonly $sectionContent = this.sectionContent.asObservable().pipe(tap(console.log));

  constructor(private http: HttpClient, private taskService: TaskService) {
  }

  getSection(name: string): Observable<SectionModel> {
    return this.http.get<SectionModel>(`/assets/content/${name}.json`).pipe(
      tap((section: SectionModel) => {
        this.retrieveSectionContent(section, +name);
        this.retrieveTasks(section);
      }),
      catchError(() => of(undefined))
    );
  }

  getStructure(): Observable<ContentSection[]> {
    return this.http.get<ContentSection[]>('/assets/content/structure.json');
  }

  retrieveTasks(section: SectionModel) {

    of(...section.lessons)
      .pipe(
        mergeMap(lesson => lesson.items.filter(item => item.type === 'task')),
        toArray(),
        mergeMap((tasks: TaskModel[]) => this.taskService.fetchTasks(tasks))
      ).subscribe();

  }

  retrieveSectionContent(section: SectionModel, id: number) {
    const content = new ContentSection();
    content.sectionId = id;
    content.title = section.title;
    content.lessons = section.lessons.map(l => ({title: l.title}));
    this.sectionContent.next(content);
  }

}

export class ContentLesson {
  title: string;
}

export class ContentSection {
  sectionId: number;
  title: string;
  lessons?: ContentLesson[];
}
