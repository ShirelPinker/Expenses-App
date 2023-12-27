import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {Category} from "../models/Category";
import {NewExpenseItem} from "../models/NewExpenseItem";
import {NewCategory} from "../models/NewCategory";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<any> {
    return this.http.get<Category[]>(`http://localhost:3001/categories`).pipe(
      map(categories => categories.sort((a, b) => a.name.localeCompare(b.name)))
    );
  }

  addCategory(newCategory: NewCategory): Observable<void> {
    return this.http.post<void>(`http://localhost:3001/categories/`, newCategory)
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3001/categories/${categoryId}`)
  }

}
