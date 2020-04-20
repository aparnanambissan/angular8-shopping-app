import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

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

    constructor() { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}