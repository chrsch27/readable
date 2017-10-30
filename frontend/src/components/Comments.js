import React, { Component } from 'react'
import '../App.css';
import { withRouter} from 'react-router-dom'
//import { editAPost, getPostById, deletePostById } from '../actions'
import { connect } from 'react-redux'
import Comment from './Comment'
import NewComment from './NewComment'


class Comments extends Component {

    render(){
        return (
            <div className='App-PostComments'>
                <NewComment/>
                <label>Comments: </label>
                <ul className='comment-list'>
                { this.props.PostComments && this.props.PostComments
                .sort( (a,b)=> ( b.voteScore -a.voteScore))
                .map((item) => {
                    if (item) {
                    return (<li key={item.id} className='comment'>
                            <Comment comment={item}/>
                            </li>
                    )
                    }else return(<div></div>)}
                )}
                </ul>
            </div>
        )
    }
}

function mapStateToProps (state){
    return {
        PostComments: state.commentReducer.comments
    }
}
export default withRouter(connect(mapStateToProps)(Comments))