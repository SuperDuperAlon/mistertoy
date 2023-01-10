import { toyService } from "../services/toy.service.js";

export const SET_TOYS = "SET_TOYS";
export const REMOVE_TOY = "REMOVE_TOY";
export const UNDO_REMOVE_TOY = "UNDO_REMOVE_TOY";
export const ADD_TOY = "ADD_TOY";
export const UPDATE_TOY = "UPDATE_TOY";
export const SET_FILTER = "SET_FILTER"
export const SET_IS_LOADING = "SET_IS_LOADING";

const initialState = {
  toys: [],
  filterBy: toyService.getDefaultFilter(),
};

export function toyReducer(state = initialState, action) {
  let toys;
  // let shoppingtoyt
//   let lastRemovedToy;

  switch (action.type) {
    case SET_TOYS:
      return { ...state, toys: action.toys };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };

    case REMOVE_TOY:
      toys = state.toys.filter((c) => c._id !== action.toyId);
      return { ...state, toys };

    case ADD_TOY:
      toys = [...state.toys, action.toy];
      return { ...state, toys };
    case UPDATE_TOY:
      toys = state.toys.map((toy) =>
        toy._id === action.toy._id ? action.toy : toy
      );
      return { ...state, toys };

      //filtering
    case SET_FILTER:
      return { ...state, filterBy: action.filter };


    default:
      return state;
  }
}
