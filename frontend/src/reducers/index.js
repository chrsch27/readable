import { combineReducers } from 'redux'
import { postReducer, filterReducer} from '../post/PostReducer'
import commentReducer from '../comment/CommentReducer'
import categoryReducer from '../category/CategoryReducer'



export default combineReducers({
  postReducer,
  categoryReducer,
  commentReducer,
  filterReducer
})