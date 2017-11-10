import {
    ADD_POST,
    EDIT_POST,
    EDIT_POSTVOTE,
    GET_POST,
    GET_POSTBYID,
    DELETE_POST,
    RECEIVE_POSTS,
    SET_POSTID,
    FILTER_POSTS,
    ADD_COMMENT,
    DELETE_COMMENT
 } from '../actions/types'

export function postReducer (state={}, action){
    console.log('postreducer start', action.type)
    
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
        let value = 0;
        if (action.data.option==='upVote') value=1;
        if (action.data.option==='downVote') value=-1;
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
      return { ...state,
                posts: state.posts.filter(post => (post.id !== action.id))
            }

    case RECEIVE_POSTS:
      return {
        ...state,
        posts:action.posts,
       // post:action.posts[0]
      }
    
    case GET_POST:
      return {
        ...state,
        post:action.post
      }

    case GET_POSTBYID:
      console.log('Gtposbyid',state, action.id)
      return {
        ...state,
        post: state.posts.filter(post => (post.id === action.id))[0]
      }

      case ADD_COMMENT:
      return {
        ...state,
        post:{...state.post,
                commentCount: state.post.commentCount+=1}
      }
      case DELETE_COMMENT:
      return {
        ...state,
        post:{...state.post,
                commentCount: state.post.commentCount-=1}
      }


      case SET_POSTID:
      return {
          ...state,
          CurrentPostId:action.id
      }
    default:
    console.log ('reducer default', action.type)
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