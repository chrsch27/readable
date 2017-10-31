import {
    ADD_COMMENT,
    EDIT_COMMENT,
    EDIT_COMMENTVOTE,
    DELETE_COMMENT,
    RECEIVE_COMMENTS
} from '../actions/types'

export default function commentReducer (state={}, action){
    
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