import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {Observable} from "rxjs";
import {Category} from "../../models/Category";
import {faTrash} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  selectedCategory: Category | null = null;
  categories$: Observable<Category[]>
  faTrash = faTrash;
  newCategoryName: string | null = null;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.getCategories()

  }

  onDeleteCategoryClicked() {
    this.categoriesService.deleteCategory(this.selectedCategory.id).subscribe(
      this.selectedCategory = null
    )
  }

  onAddCategoryClicked() {
    this.categoriesService.addCategory({name: this.newCategoryName}).subscribe(
      this.newCategoryName = null
    )
  }


}
