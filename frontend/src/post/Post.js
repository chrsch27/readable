import React, { Component } from 'react'
import '../App.css';
import { Link, withRouter} from 'react-router-dom'
import { deletePostById, editAPostVote} from './PostActions'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' 
import TrashIcon from 'react-icons/lib/fa/trash-o'


class Post extends Component {
    constructor(){
        super();
        console.log(this.props)
        this.state= {
            editMode: this.props?this.props.editMode:'select'  //show, select, edit ,new
        }
        this.handleVote= this.handleVote.bind(this);
        this.delete= this.delete.bind(this);

    }


    handleVote(vote){
        console.log('handleVote',vote.target.id);
        const postData = {
            id: this.props.post.id,
            option: vote.target.id
        }
        this.props.editAPostVote(postData);
    }

    delete(id){
        confirmAlert({
            title: 'Confirm to submit',                        // Title dialog
            message: 'Do you really want to delete this Post?', // Message dialog
            childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => {this.props.deletePost(id); this.setState( { redirectToNewPage: true });},    // Action after Confirm
            onCancel: () => alert('Not deleted'),      // Action after Cancel
          })
    }

    render() {
        return(
            <div className="Post">
                <div className='PostHeader'>
                    <div align="left">
                        <label className='Label'>Author: </label>
                        <label>{this.props.post.author}</label>
                    </div>
                    <div align="right">
                        <label className='Label'>Date: </label>
                        <label>{(new Date(this.props.post.timestamp)).toLocaleDateString("en-US")}</label>
                    </div>
                </div>

                <input className='postEdit-hide' type="text" defaultValue={this.props.post.id} name="id"/>
                <div>
                    <label className='postTitle'>{
                        (this.state.editMode === "select")
                            ?<Link className='postTitle' to={'/post/' + this.props.post.id}>{this.props.post.title}</Link>
                            :this.props.post.title}
                    </label>
                </div>
                <div className='postBody'>
                    <label>{this.props.post.body}</label>
                </div>
                <div className='PostFooter'>
                    <div>
                        <label className='Label'>Category: </label>
                        <label>{this.props.post.category}</label>
                    </div>
                    <div>
                        <label className='Label'>Comments: </label>
                        <label>{this.props.post.commentCount}</label>
                        <label className='Label'>Vote: </label>
                        <label>{this.props.post.voteScore}</label>
                        <button id='upVote' onClick={this.handleVote}>+</button>
                        <button id='downVote' onClick={this.handleVote}>-</button>
                        <button onClick={()=>this.delete(this.props.post.id)}><div><TrashIcon/></div></button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    editAPostVote: (data) => dispatch(editAPostVote(data)),
    deletePost: (id) => dispatch(deletePostById(id))
       
  });
export default withRouter(connect(null,mapDispatchToProps)(Post))