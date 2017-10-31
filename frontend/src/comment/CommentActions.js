import * as apiData from '../utils/api'

import {
    EDIT_COMMENTVOTE,
    EDIT_COMMENT,
    ADD_COMMENT,
    DELETE_COMMENT,
    RECEIVE_COMMENTS
} from '../actions/types'


export const addNewComment = (commentdata) => dispatch => {
    apiData.addComment(commentdata).then((res)=>{console.log("addCommentdata",commentdata); dispatch(addComment(commentdata))})
}

export const editAComment = (commentdata) => dispatch => {
    apiData.editComment(commentdata).then((res)=>{console.log("commentdata",res); dispatch(editComment(commentdata))})
}
export const editACommentVote = (data) => dispatch => {
    apiData.editCommentVote(data).then((res) => {console.log("editACommentVote",res); dispatch(editCommentVote(data))})
}

export const getCommentById =(id) => dispatch => {
    apiData.getCommentById(id).then((data)=>{dispatch(receivePostComments(data))})
}

export const deleteCommentById =(id) => dispatch => {
    //dispatch(deletePost(id));
    apiData.deleteComment(id).then((data)=>{dispatch(deleteComment(id))})
}

export const fetchPostComments = (postId) => dispatch => {
    
    apiData.getPostComments(postId).then((data) => {console.log('fetchcomments',data); dispatch(receivePostComments(data))})
}

const editComment = comment => ({
    type: EDIT_COMMENT,
    comment
  });

  const editCommentVote = data => ({
    type: EDIT_COMMENTVOTE,
    data
  });
  
  const addComment = comment => ({
    type: ADD_COMMENT,
    comment
  });
  
  const deleteComment = id => ({
    type: DELETE_COMMENT,
    id
  });

  export const receivePostComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
  });