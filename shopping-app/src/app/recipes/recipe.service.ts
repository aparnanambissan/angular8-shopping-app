import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Mushroom Noodles',
            'Recipe steps',
            'https://www.washingtonpost.com/news/voraciously/wp-content/uploads/sites/68/2020/01/v-rr-lunarnewyear_01_leadweb.jpg',
            [
                new Ingredient('Mushroom', 5),
                new Ingredient('Spring Onion', 1)
            ]
        ),
        new Recipe(
            'Veg Pizza',
            'Recipe steps 2',
            'https://www.diabetes.org.uk/resources-s3/migration/recipes/Roasted-Vegetable-Pizza.jpg',
            [
                new Ingredient('Spinach', 1),
                new Ingredient('Mushroom', 2),
                new Ingredient('Bell Pepper', 1),
                new Ingredient('Tomato', 2)
            ]
        )
    ];

    constructor(private slService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}