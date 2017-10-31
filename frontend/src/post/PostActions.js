import * as apiData from '../utils/api'

import {
    RECEIVE_POSTS,
    GET_POST,
    EDIT_POST,
    EDIT_POSTVOTE,
    ADD_POST,
    DELETE_POST,
    FILTER_POSTS,
    SET_POSTID
} from '../actions/types'
  
  export const fetchPosts = () => dispatch => {
  
      apiData.getPosts().then((data) => {console.log('fetchpos',data); dispatch(receivePosts(data))})
  }
  
  
  export const addNewPost = (postdata) => dispatch => {
      apiData.addPost(postdata).then((res)=>{console.log("addpostdata",postdata); dispatch(addPost(postdata))})
  }
  
  
  
  export const editAPost = (postdata) => dispatch => {
      apiData.editPost(postdata).then((res)=>{console.log("postdata",res); dispatch(editPost(postdata))})
  }
  
  export const editAPostVote = (data) => dispatch => {
      apiData.editPostVote(data).then((res) => {console.log("editAPostVote",res); dispatch(editPostVote(data))})
  }
  
  export const getPostById =(id) => dispatch => {
      apiData.getPostById(id).then((data)=>{console.log("getPostById",data);dispatch(getPost(data))})
  }
  
  export const deletePostById =(id) => dispatch => {
      //dispatch(deletePost(id));
      apiData.deletePost(id).then((data)=>{dispatch(deletePost(id))})
  }
  

  export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
  });

  const getPost = post => ({
    type: GET_POST,
    post
  });
  
const editPost = post => ({
  type: EDIT_POST,
  post
});

const editPostVote = data => ({
    type: EDIT_POSTVOTE,
    data
  });

const addPost = post => ({
  type: ADD_POST,
  post
});

const deletePost = id => ({
  type: DELETE_POST,
  id
});
export const filterPostsByCategory = filter =>({
    type:FILTER_POSTS,
    filter
});

export const setCurrentPostId = id =>({
    type: SET_POSTID,
    id
})