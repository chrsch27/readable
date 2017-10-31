import * as apiData from '../utils/api'
import {
    RECEIVE_CATEGORIES
} from '../actions/types'


export const fetchCategories = () => dispatch => {

    apiData.getCategories().then((data) => {console.log(data); dispatch(receiveCategories(data))})
}

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
  });
  
