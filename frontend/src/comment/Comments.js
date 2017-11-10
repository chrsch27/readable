import React, { Component } from 'react'
import '../App.css';
import { withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import Comment from './Comment'
import NewComment from './NewComment'


class Comments extends Component {

    render(){
        return (
            <div className='App-PostComments'>
                <NewComment/>
                <label className="ms-font-xl">Comments: </label>
                <ul className='comment-list'>
                { this.props.PostComments && this.props.PostComments
                .sort( (a,b)=> ( b.voteScore -a.voteScore))
                .map((item) => (item
                        ?<li key={item.id} className='comment'>
                            <Comment comment={item} canBeEdited="true"/>
                        </li>
                       :<div></div>)
                )}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({commentReducer}){
    return {
        PostComments: commentReducer.comments
    }
}
export default withRouter(connect(mapStateToProps)(Comments))