import {
    RECEIVE_CATEGORIES
} from '../actions/types'


export default function categoryReducer (state={}, action){
    switch(action.type) {
      case RECEIVE_CATEGORIES:
        return {
          ...state,
          categories: action.categories
        }
      default:
        return state;
    }
  }
  
