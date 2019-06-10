import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { SectionModel } from "../models";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  constructor(
    private http: HttpClient
  ) {
  }

  getSection(name: string): Observable<SectionModel> {
    return this.http.get<SectionModel>(`/assets/content/${name}.json`).pipe(
      catchError(() => of(undefined))
    );
  }
}
