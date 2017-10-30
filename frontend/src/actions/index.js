import * as apiData from '../utils/api'

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const GET_POST = 'GET_POST';
export const EDIT_POSTVOTE = 'EDIT_POSTVOTE';
export const DELETE_POST = 'DELETE_POST';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const FILTER_POSTS = 'FILTER_POSTS';
export const SET_POSTID = 'SET_POSTID';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const EDIT_COMMENTVOTE = 'EDIT_COMMENTVOTE';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const dummy  = ' dummy';



export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch => {

	apiData.getCategories().then((data) => {console.log(data); dispatch(receiveCategories(data))})
}

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

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

export const fetchPostComments = (postId) => dispatch => {
    
    apiData.getPostComments(postId).then((data) => {console.log('fetchcomments',data); dispatch(receivePostComments(data))})
}

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

export const filterPostsByCategory = filter =>({
    type:FILTER_POSTS,
    filter
});

export const setCurrentPostId = id =>({
    type: SET_POSTID,
    id
})