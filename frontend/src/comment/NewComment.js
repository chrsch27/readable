import React, { Component } from 'react'
import '../App.css';
import { withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {addNewComment} from './CommentActions'
import {DefaultButton } from 'office-ui-fabric-react/lib/Button';



class NewComment extends Component {
    constructor(){
        super();
        this.state= {
            disabled:true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        this.setState ({ disabled: !(this.refs.author.value && 
                                    this.refs.body.value && 
                                    this.refs.author.value.length > 0 && 
                                    this.refs.body.value.length > 0)})
    }
    
    handleSubmit(){
        const commentData = {
            id: Date.now().toString(),
            parentId: this.props.PostID,
            timestamp: Date.now(),
            author: this.refs.author.value,
            body: this.refs.body.value,
            voteScore: 1
        }
        this.props.addComment(commentData);
        this.refs.author.value=''; 
        this.refs.body.value='';
        this.setState({disabled:true})
    }

    render(){
        return (
            <div className='ms-fontColor-themeDarker ms-bgColor-themeLighterAlt'>
                <h2>new comment to this post: </h2>
                <form className='newCommentForm' onSubmit={this.handleSubmit}>
                    <label>Author:
                        <input type='text' ref='author' placeholder='author' onChange={this.handleChange}/>
                    </label>
                    <label>Text:
                        <textarea ref="body" placeholder="edit comment" onChange={this.handleChange}/>
                    </label>
                    <div>
                        <DefaultButton
                            primary={ true }
                            disabled= {this.state.disabled}
                            text='Save comment'
                            onClick={ this.handleSubmit}
                        />
                    </div>
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