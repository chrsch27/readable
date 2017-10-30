import React, { Component } from 'react'
import '../App.css';
import { withRouter} from 'react-router-dom'
import { editACommentVote, deleteCommentById } from '../actions'
import { connect } from 'react-redux'
import TrashIcon from 'react-icons/lib/fa/trash-o'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' 



class Comment extends Component {

    constructor() {
        super();
        this.handleVote=this.handleVote.bind(this);
        this.delete=this.delete.bind(this);
    }

    handleVote(vote){
        const postData = {
            id: this.props.comment.id,
            option: vote.target.id
        }
        this.props.editACommentVote(postData);
    }
    delete(){
        console.log('deletecomment')
        confirmAlert({
            title: 'Confirm to delete',                        // Title dialog
            message: 'Do you really want to delete this Comment?', // Message dialog
            childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => {this.props.deleteComment(this.props.comment.id);},    // Action after Confirm
            onCancel: () => alert('Not deleted'),      // Action after Cancel
          })
    }



    render(){
        return (
            <div className='App-PostComment'>
                <div className='commentHeader'>
                    <div className='comment-author'>{this.props.comment.author}</div>
                    <div className='comment-time'>{(new Date(this.props.comment.timestamp)).toLocaleDateString("en-US")}</div>
                </div>
                <div className='comment-body'> {this.props.comment.body}</div>
                <div className='comment-footer'>
                    <div>
                    
                    </div>
                    <div className="commentVote">
                        <label>Vote score:   </label>
                        <label>{this.props.comment.voteScore}</label>
                        <button id='upVote' onClick={this.handleVote}>+</button>
                        <button id='downVote' onClick={this.handleVote}>-</button>
                        <button id='delete' onClick={this.delete}><div><TrashIcon/></div></button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    editACommentVote: (data) => dispatch(editACommentVote(data)),
    deleteComment: (id)=> dispatch(deleteCommentById(id))
       
  });

export default withRouter(connect(null,mapDispatchToProps)(Comment))