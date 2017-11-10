import React, { Component } from 'react'
import '../App.css';
import { Link, Redirect,withRouter} from 'react-router-dom'
import { editAPost, getPostById, getPostFromId, deletePostById, setCurrentPostId, editAPostVote} from './PostActions'
import { fetchPostComments} from '../comment/CommentActions'
import { connect } from 'react-redux'
import Comments from '../comment/Comments'
import Post from '../post/Post'
import PostDeleted from '../post/PostDeleted'
import MyAppBar from '../app/MyAppBar'


class PostDetail extends Component {
    constructor(props) {
        super (props);
        //props.getPostFromId(this.props.match.params.id)
        this.state = {
            editMode:false,
            redirectToNewPage: false,
        }
    }

    componentDidMount(){
        this.props.posts 
        ?!this.props.post && 
            this.props.getPostFromId(this.props.match.params.id)
        :this.props.getPost(this.props.match.params.id)
        this.props.setCurrentPostId(this.props.match.params.id)
        this.props.fetchComments(this.props.match.params.id)
    }

   
    render() {
        if (this.state.redirectToNewPage){
            return (
                <Redirect to="/"/>
            )
        }
        if (this.props.post && (Object.keys(this.props.post).length > 0))
            return(
                <div className="PostDetail">
                    <MyAppBar title="readable - show Post"/>
                    <Link to="/">
                        <i className="divpad ms-fontColor-themeLighterAlt ms-bgColor-themeDarker ms-Icon ms-Icon--Back" aria-hidden="true">
                        <span className="ms-font-m App">Back </span></i> 
                    </Link>
                    <Post canBeEdited="true" post={this.props.post}/>
                    <Comments />
                </div>
            )
        else {
            return (
                <PostDeleted/>
            )
        }
    }
}


function mapStateToProps(state){
    return {      
      post: state.postReducer.post,
      posts: state.postReducer.posts
    }
  }

const mapDispatchToProps = dispatch => ({
      getPost: (id) => dispatch(getPostById(id)),
      getPostFromId: (id) => dispatch(getPostFromId(id)),
      editPost: (data,id) => dispatch(editAPost(data,id)),
      deletePost: (id) => dispatch(deletePostById(id)),
      fetchComments: (id) => dispatch(fetchPostComments(id)),
      setCurrentPostId: (id) => dispatch(setCurrentPostId(id)),
      editAPostVote: (data) => dispatch(editAPostVote(data))
  });

export default withRouter(connect (mapStateToProps, mapDispatchToProps) (PostDetail));