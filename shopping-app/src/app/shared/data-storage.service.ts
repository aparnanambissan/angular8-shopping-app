import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const token = this.authService.getToken();
        return this.httpClient.put('https://ng-recipe-book-bcef5.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
            observe: 'body',
            reportProgress: true
        });

        // const req = new HttpRequest('PUT', 'https://ng-recipe-book-bcef5.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
        //     reportProgress: true
        // });
        // return this.httpClient.request(req);
    }

    getRecipes() {
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-bcef5.firebaseio.com/recipes.json', {
            observe: 'body'
        })
            .pipe(
                map(
                    (recipes) => {
                        for (let recipe of recipes) {
                            if (!recipe['ingredients']) {
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                    }
                )
            )
            .subscribe(
                data => {
                    const recipes: Recipe[] = data;
                    this.recipeService.setRecipes(recipes);
                },
                error => console.error('There was an error!', error)
            )
    }
}