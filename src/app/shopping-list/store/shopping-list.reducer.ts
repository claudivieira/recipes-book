import { Ingredient } from "../../shared/ingredient.module";
import * as ShoppingListActions from "./shopping-list.actions";


export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

export interface AppState {
    shoppingList: State
}

const initialState: State = {
    ingredients: [
        new Ingredient('Carrots', 10),
        new Ingredient('Eggs', 15),
      ],
    editedIngredient: null,
    editedIngredientIndex: -1,
};

//its the action that triggers the reducer and updates the state
//the state is the current state, before being changed
//when the app runs for the first time, 
//the state will be now the initialState

//we need to know which action was dispatched
//so we know how to edit our state
export function shoppingListReducer(
    state: State = initialState, 
    action: ShoppingListActions.ShoppingListActions
) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            //state cant be immutable
            //always copy the old state then overwrite what you want to change
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            }
            case ShoppingListActions.START_EDIT:
                return {
                    ...state,
                    editedIngredientIndex: action.payload,
                    editedIngredient: {...state.ingredients[action.payload]}
                }
                case ShoppingListActions.STOP_EDIT:
                    return {
                        ...state,
                        editedIngredient: null,
                        editedIngredientIndex: -1
                    }
        default: 
        return state;
    }
}