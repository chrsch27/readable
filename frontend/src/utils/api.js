const apiserver='http://localhost:3001/'

export function getCategories() {
    const url = apiserver + 'categories';
    console.log(url);
    return fetch (url,
    {
        method:'GET',
        headers: {'Authorization': 'myAuthorization'},
        "Content-Type": "application/json"
    })
    .then(res => res.json())
    .then(data =>{console.log("datajson",data.categories);return data.categories})
}

export const getPosts = () => {
    const url = apiserver +'posts';
    console.log ("getPosts",url);
    return fetch(url , 
        { headers: { 'Authorization': 'myAuthorization' }})
        .then( res => { console.log('resPost',res); return(res.json()) })
        .then((data) => { console.log('apidataPost',data); return (data);}
        ); 
}

export const getPostById = (id) => {
    const url = apiserver +'posts/' +id;
    console.log ("getPostById",url);    
    return fetch(url , 
        { headers: { 'Authorization': 'myAuthorization' }})
        .then( res => { console.log('resPost',res); return(res.json()) })
        .then((data) => { console.log('apidataPost',data); return (data);}
    ); 
}

export const addPost = (data) =>{
  return fetch(apiserver + 'posts/',{
    method:'POST',
    headers: {'Authorization': 'myAuthorization',
    "Content-Type": "application/json"},
    body: JSON.stringify(data)
    })//.then (res => {console.log("apiAddPost",res.json());res.json()})//.catch((error) => console.log("error",error))
}


export const editPost = (data) => {
    const url = apiserver +'posts/' +data.id;
    return fetch(url,{
        method:'PUT',
        headers: {'Authorization': 'myAuthorization',
        "Content-Type": "application/json"},
        body: JSON.stringify(data)
        })
}

export const editPostVote = (data) => {
    const url = apiserver +'posts/' +data.id;
    return fetch(url,{
        method:'POST',
        headers: {'Authorization': 'myAuthorization',
        "Content-Type": "application/json"},
        body: JSON.stringify(data)
        })
}

export const deletePost = (id) => {
    const url = apiserver +'posts/' + id;
    return fetch(url,{
        method:'DELETE',
        headers: {'Authorization': 'myAuthorization'}
    })
}

export const getPostComments = (postid) => {
    const url = apiserver +'posts/' + postid +'/Comments';
    console.log ("getPostComments",url);
    return fetch(url , 
        { headers: { 'Authorization': 'myAuthorization' }})
        .then( res => { console.log('resPost',res); return(res.json()) })
        .then((data) => { console.log('apidataPost',data); return (data);}
        ); 
}
export const getCommentById = (id) => {
    const url = apiserver +'comments/' +id;
    console.log ("getPostById",url);    
    return fetch(url , 
        { headers: { 'Authorization': 'myAuthorization' }})
        .then( res => { console.log('resComment',res); return(res.json()) })
        .then((data) => { console.log('apidataComment',data); return (data);}
    ); 
}

export const addComment = (data) =>{
    console.log('CommentData', data)
    return fetch(apiserver + 'comments/',{
      method:'POST',
      headers: {'Authorization': 'myAuthorization',
      "Content-Type": "application/json"},
      body: JSON.stringify(data)
      })//.then (res => {console.log("apiAddPost",res.json());res.json()})//.catch((error) => console.log("error",error))
  }
  
  
  export const editComment = (data) => {
      const url = apiserver +'comments/' +data.id;
      return fetch(url,{
          method:'PUT',
          headers: {'Authorization': 'myAuthorization',
          "Content-Type": "application/json"},
          body: JSON.stringify(data)
          })
  }
  export const editCommentVote = (data) => {
    const url = apiserver +'comments/' +data.id;
    return fetch(url,{
        method:'POST',
        headers: {'Authorization': 'myAuthorization',
        "Content-Type": "application/json"},
        body: JSON.stringify(data)
        })
}
  
  export const deleteComment = (id) => {
      const url = apiserver +'comments/' + id;
      return fetch(url,{
          method:'DELETE',
          headers: {'Authorization': 'myAuthorization'}
      })
  }