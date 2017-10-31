import React, { Component } from 'react'
import '../App.css';
import { withRouter} from 'react-router-dom'
//import { editAPost, getPostById, deletePostById } from '../actions'
import { connect } from 'react-redux'
import {addNewComment} from './CommentActions'



class NewComment extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(){
        const commentData = {
            id: Date.now().toString(),
            parentId: this.props.PostID,
            timestamp: Date.now(),
            author: this.refs.author.value,
            body: this.refs.body.value
        }
        //apiData.addPost(postData);
        console.log('submit',commentData);
        this.props.addComment(commentData);
        this.setState( { redirectToNewPage: true });
    }

    render(){
        return (
            <div className='App-PostComment'>
                <h2>new comment to this post: </h2>
                <form className='newCommentForm' onSubmit={this.handleSubmit}>
                    <label>Author:
                        <input type='text' ref='author' placeholder='author'/>
                    </label>
                    <label>Text:
                        <textarea ref="body" placeholder="edit comment"/>
                    </label>
                    <input type="submit" value="Submit comment"/>
                </form>
            </div>
        )
    }
}

function mapStateToProps (state){
    return {
        PostID: state.postReducer.CurrentPostId
    }
}
const mapDispatchToProps = dispatch => ({
    addComment: (data) => dispatch(addNewComment(data)),
       
  });

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewComment))