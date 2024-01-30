import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {Observable} from "rxjs";
import {Category} from "../../models/Category";
import {faTrash, faPencil} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {log10} from "chart.js/helpers";


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  selectedCategoryToDelete: Category | null = null;
  selectedCategoryToEdit: Category | null = null;
  categories$: Observable<Category[]>
  faTrash = faTrash;
  newCategoryName: string | null = null;
  categoryToEditInput: string | null = null
  editCategoryForm: FormGroup;

  constructor(private categoriesService: CategoriesService, private formBuilder: FormBuilder) {
    this.editCategoryForm = this.formBuilder.group({
      selectedCategoryToEdit: new FormControl(null),
      categoryToEditInput: new FormControl(null, [Validators.required])
    })
    this.categories$ = this.categoriesService.getCategories()
  }

  ngOnInit() {
    this.editCategoryForm.controls['selectedCategoryToEdit'].valueChanges.subscribe(
      () => {
        const selectedCategory = this.editCategoryForm.get('selectedCategoryToEdit')!.value
        if(selectedCategory){
          this.editCategoryForm.get('categoryToEditInput')!.setValue((selectedCategory.name))
        }
        else{
          this.editCategoryForm.get('categoryToEditInput')!.setValue(null)
        }
      }
    )
  }

  onDeleteCategoryClicked() {
    this.categoriesService.deleteCategory(this.selectedCategoryToDelete.id).subscribe(
      ()=>{
        this.selectedCategoryToDelete = null
        this.categories$ = this.categoriesService.getCategories()
      }

    )
  }

  onAddCategoryClicked() {
    this.categoriesService.addCategory({name: this.newCategoryName}).subscribe(
      ()=> {
        this.newCategoryName = null
        this.categories$ = this.categoriesService.getCategories()
      }
    )
  }

  onEditCategoryClicked() {
    console.log(this.editCategoryForm.get('categoryToEditInput')!.value)
    const updatedCategory = {
      id: this.editCategoryForm.get('selectedCategoryToEdit')!.value.id,
      name: this.editCategoryForm.get('categoryToEditInput')!.value
    }
    this.categoriesService.editCategory(updatedCategory).subscribe(()=> {
      this.editCategoryForm.controls['selectedCategoryToEdit'].reset()
      this.categories$ = this.categoriesService.getCategories()

    })}
}
