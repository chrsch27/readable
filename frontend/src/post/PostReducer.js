import {
    ADD_POST,
    EDIT_POST,
    EDIT_POSTVOTE,
    GET_POST,
    DELETE_POST,
    RECEIVE_POSTS,
    SET_POSTID,
    FILTER_POSTS
 } from '../actions/types'

export function postReducer (state={}, action){
    
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

export function filterReducer (state={}, action){
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