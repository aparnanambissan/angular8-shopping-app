import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {
        return this.http.put('https://ng-recipe-book-bcef5.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    getRecipes() {
        this.http.get<any>('https://ng-recipe-book-bcef5.firebaseio.com/recipes.json')
            .subscribe(
                data => {
                    const recipes: Recipe[] = data;
                    this.recipeService.setRecipes(recipes);
                },
                error => console.error('There was an error!', error)
            )
    }
}