import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as RecipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromRecipe from './recipe.reducers';



@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$.
        pipe(
            ofType(RecipeActions.FETCH_RECIPES),
            switchMap((action: RecipeActions.FetchRecipes) => {
                return this.httpClient.get<Recipe[]>('https://ng-recipe-book-bcef5.firebaseio.com/recipes.json', {
                    observe: 'body',
                    responseType: 'json'
                })
            })
        )
        .pipe(
            map(
                (recipes) => {
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return {
                        type: RecipeActions.SET_RECIPES,
                        payload: recipes
                    }
                }
            )
        );

    @Effect({ dispatch: false })
    recipeStore = this.actions$
        .pipe(
            ofType(RecipeActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, state]) => {
                return this.httpClient.put('https://ng-recipe-book-bcef5.firebaseio.com/recipes.json', state.recipes, {
                    observe: 'body',
                    reportProgress: true
                });
            }))


    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.FeatureState>) { }

}