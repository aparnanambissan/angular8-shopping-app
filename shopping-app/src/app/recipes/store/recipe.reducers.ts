import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: [
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
    ]
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            }
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            }
        case RecipeActions.DELETE_RECIPE:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            }
        default: return state;
    }
}