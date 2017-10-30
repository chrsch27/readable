import React, { Component } from 'react'
import logo from '../logo.svg';
import '../App.css';
import { Link, Redirect,withRouter} from 'react-router-dom'
import {addNewPost} from '../actions'


import { connect } from 'react-redux'

class NewPost extends Component {
constructor(props){
    super(props);
    this.state= {
        redirectToNewPage: false
    }
    this.handleSubmit= this.handleSubmit.bind(this);
}

handleSubmit(){
    const postData = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        title: this.refs.title.value,
        author: "chrsch",
        body: this.refs.postText.value,
        category: this.refs.postCategory.value
    }
    //apiData.addPost(postData);

    this.props.addPost(postData);
    this.setState( { redirectToNewPage: true });
}

render() {
    console.log ("newpostprops", this.props);
    if (this.state.redirectToNewPage){
        return (
            <Redirect to="/"/>
        )
    }
    return(
        <div className='NewPost'>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">readable - New Post</h1>
            </header>
            <Link to="/"> Back </Link>
            <form className="newPostForm" onSubmit={this.handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" placeholder="title" ref="title"/>
                </div>
                <div>
                    <label>Text:</label>
                    <textarea ref="postText" placeholder="edit text"/>
                </div>
                <div>
                    <label>Category:
                        <select ref="postCategory">
                            { this.props.categories && this.props.categories.map((category,index)=>(
                                <option key={index} value= {category.name}>{category.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <input type="submit" value="Submit"/>
                </div>

            </form>

        </div>

    )
}
}
function mapStateToProps(state){
    console.log('MapstateToProps_NewPost',state);
    return {      
      categories: state.categoryReducer.categories
    }
  }
  const mapDispatchToProps = dispatch => ({
    addPost: (data) => dispatch(addNewPost(data)),
       
  });
export default withRouter(connect (mapStateToProps, mapDispatchToProps) (NewPost));