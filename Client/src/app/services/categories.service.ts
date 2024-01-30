import {Injectable} from '@angular/core';
import {map, Observable, share, shareReplay} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {Category} from "../models/Category";
import {NewCategory} from "../models/NewCategory";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<any> {
    return this.http.get<Category[]>(`http://localhost:3001/categories`).pipe(
      map(categories => categories.sort((a, b) => a.name.localeCompare(b.name))),
      shareReplay()
    );
  }

  addCategory(newCategory: NewCategory): Observable<void> {
    return this.http.post<void>(`http://localhost:3001/categories/`, newCategory)
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3001/categories/${categoryId}`)
  }

  editCategory(updatedCategory: Category) {
    return this.http.put<void>(`http://localhost:3001/categories/`, updatedCategory)

  }
}
