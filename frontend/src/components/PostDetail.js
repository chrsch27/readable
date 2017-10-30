import React, { Component } from 'react'
import '../App.css';
import logo from '../logo.svg';
import { Link, Redirect,withRouter} from 'react-router-dom'
import { editAPost, getPostById, deletePostById, fetchPostComments, setCurrentPostId, editAPostVote} from '../actions'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' 
import Comments from './Comments'
import TrashIcon from 'react-icons/lib/fa/trash-o'

class PostDetail extends Component {
    constructor(props) {
        super (props);
        this.state = {
            editMode:false,
            redirectToNewPage: false

        }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.delete = this.delete.bind(this);

    }

    componentDidMount(){
      
        this.props.getPost(this.props.match.params.id)
        this.props.setCurrentPostId(this.props.match.params.id)
        this.props.fetchComments(this.props.match.params.id)
        console.log('Props Postdetail',this.props);
    }

    toggleEdit() {
        let newMode = !this.state.editMode;
        this.setState({editMode: newMode});
    }

    onChange = (e) => {
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState(state)
    }
    
    handleSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);
        if (this.state.editMode){
            const postData = {
                title: data.get('title'),
                body: data.get('body'),
                id:data.get('id')
            }
            this.props.editPost(postData,data.get('id'));
            this.setState({editMode: !this.state.editMode})
        }
    }

    handleVote(vote){
        console.log('handleVote',vote.target.id);
        const postData = {
            id: this.props.match.params.id,
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
        if (this.state.redirectToNewPage){
            return (
                <Redirect to="/"/>
            )
        }
        if (this.props.post)
            return(
                <div className="Post">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">readable - show Post</h1>
                    </header>
                    <Link to="/">Back</Link>
                    <form className='newPostForm' key={this.props.post.id} onSubmit={(e) =>this.handleSubmit(e)}>
                        
                        <div className='PostHeader'>
                            <div className='lineflex'>
                                <div className='Label'>Author: </div>
                                <div>{this.props.post.author}</div>
                            </div>
                            <div className='lineflex'>
                                <div className='Label'>Date: </div>
                                <div>{(new Date(this.props.post.timestamp)).toLocaleDateString("en-US")}</div>
                            </div>
                        </div>

                        <input className='postEdit-hide' type="text" defaultValue={this.props.post.id} name="id"/>
                        <div>
                            <label className={this.state.editMode?'postEdit-show':'postEdit-hide'} >Title: </label>
                            <input className={this.state.editMode?'postEdit-show':'postEdit-hide'} 
                                    type="text" defaultValue={this.props.post.title} name="title"/>
                            <div className={this.state.editMode?'postEdit-hide':'postTitle'}>{this.props.post.title}</div>
                        </div>
                        <div className='postBody'>
                            <label className={this.state.editMode?'postEdit-show':'postEdit-hide'}>Body: </label>
                            <textarea className={this.state.editMode?'postEdit-show':'postEdit-hide'} 
                                    defaultValue={this.props.post.body} name="body"/>
                            <div className={this.state.editMode?'postEdit-hide':'postText'}>{this.props.post.body}</div>
                        </div>
                        <div className='PostFooter'>
                                            <div className='lineflex'>
                                <div className='Label'>Category: </div>
                                <div>{this.props.post.category}</div>
                            </div>
                            <div className='lineflex'>
                                <div className='Label'>Vote: </div>
                                <div>{this.props.post.voteScore}</div>
                                <button id='upVote' onClick={this.handleVote}>+</button>
                                <button id='downVote' onClick={this.handleVote}>-</button>
                                <button onClick={()=>this.delete(this.props.post.id)}><div><TrashIcon/></div></button>
                            </div>

                        </div>
                        {this.state.editMode && <input type="submit" value="Submit"/>}
                        {(this.state.editMode === false) && <button id="btnEdit" onClick={this.toggleEdit}>Edit</button>}
                        {this.state.editMode && <button id="btnCancel" onClick={this.toggleEdit}>Cancel </button> }
                    </form>
                    <Comments />
                </div>
            )
        else {
            return(
                <div>keine posts</div>
            )
        }
    }
}

function mapStateToProps(state){
    console.log('MapstateToProps_NewPost',state);
    return {      
      post: state.postReducer.post
    }
  }

const mapDispatchToProps = dispatch => ({
      getPost: (id) => dispatch(getPostById(id)),
      editPost: (data,id) => dispatch(editAPost(data,id)),
      deletePost: (id) => dispatch(deletePostById(id)),
      fetchComments: (id) => dispatch(fetchPostComments(id)),
      setCurrentPostId: (id) => dispatch(setCurrentPostId(id)),
      editAPostVote: (data) => dispatch(editAPostVote(data))
  });

export default withRouter(connect (mapStateToProps, mapDispatchToProps) (PostDetail));