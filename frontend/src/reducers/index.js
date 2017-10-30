import { combineReducers } from 'redux'
import {
  ADD_POST,
  EDIT_POST,
  GET_POST,
  EDIT_POSTVOTE,
  DELETE_POST,
  SET_POSTID,
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  EDIT_COMMENTVOTE,
  DELETE_COMMENT,
  RECEIVE_COMMENTS,
  FILTER_POSTS
} from '../actions'

function postReducer (state={}, action){
    
  switch(action.type) {
    case ADD_POST:
        return { ...state,
                posts: [...state.posts, action.post]
        };
    case EDIT_POST: 
        return { ...state,
                posts: state.posts.map(post => {
                if (post.id.toString() === action.post.id)
                    return { ...post,
                        title:action.post.title,
                        body:action.post.body
                    }
                    else return post
                })
        };
    case EDIT_POSTVOTE: 
        console.log('reducer post vote', action)
        let value = 0;
        if (action.data.option==='upVote') value=1;
        if (action.data.option==='downVote') value=-1;
        console.log('reducer post vote', value)
        return { ...state,
                posts: state.posts.map(post => {
                if (post.id.toString() === action.data.id)
                    return { ...post,
                        voteScore: post.voteScore + value
                    }
                    else return post
                }),
                post:  { ...state.post,
                    voteScore: state.post?state.post.voteScore + value:null
                }
        };
    case DELETE_POST:
        console.log('deletPost', action)
      return { ...state,
                posts: state.posts.filter(post => (post.id !== action.id))
            }

    case RECEIVE_POSTS:
      return {
        ...state,
        posts:action.posts
      }
    
    case GET_POST:
      console.log('GetPost',action)
      return {
        ...state,
        post:action.post
      }

      case SET_POSTID:
      return {
          ...state,
          CurrentPostId:action.id
      }
    default:
      return state;
  }
}

function commentReducer (state={}, action){
    
  switch(action.type) {
    case ADD_COMMENT:
        return { ...state,
                comments: [...state.comments, action.comment]
        };
    case EDIT_COMMENT: 
        return { ...state,
            comments: state.comments.map(comment => {
                if (comment.id.toString() === action.comment.id)
                    return { ...comment,
                        
                    }
                    else return comment
                })
        };
    case EDIT_COMMENTVOTE: 
        let value = 0;
        if (action.data.option==='upVote') value=1;
        if (action.data.option==='downVote') value=-1;
        return { ...state,
            comments: state.comments.map(comment => {
                if (comment.id.toString() === action.data.id)
                    return { ...comment,
                        voteScore: comment.voteScore + value
                    }
                    else return comment
                })
        };
        
    case DELETE_COMMENT:
      return { ...state,
        comments: state.comments.filter(comment => (comment.id !== action.id))
        }

    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments:action.comments
      }
    default:
      return state;
  }
}

function categoryReducer (state={}, action){
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

function filterReducer (state={}, action){
    switch(action.type) {
        case FILTER_POSTS:
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state;
    }
}

export default combineReducers({
  postReducer,
  categoryReducer,
  commentReducer,
  filterReducer
})