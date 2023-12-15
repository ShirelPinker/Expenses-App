import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';
import {Category} from "../models/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories():Observable<any> {
    return this.http.get<Category[]>(`http://localhost:3001/categories`).pipe(
      map(categories => categories.sort((a, b) => a.name.localeCompare(b.name)))
    );  }
}
