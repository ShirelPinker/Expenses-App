import { Injectable } from '@angular/core';
import {delay, Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories():Observable<any> {
    return this.http.get(`http://localhost:3001/categories`)
  }
}
