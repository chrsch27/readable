import React, { Component } from 'react'
import '../App.css';
import { Link, Redirect,withRouter} from 'react-router-dom'
import {addNewPost} from './PostActions'
import MyAppBar from '../app/MyAppBar'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';


import { connect } from 'react-redux'

class NewPost extends Component {
constructor(props){
    super(props);
    this.state= {
        redirectToNewPage: false,
        disabled:true
    }
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleChange= this.handleChange.bind(this);
}

handleChange(event) {
    this.setState ({ disabled: !(this.refs.title.value && 
                                this.refs.postText.value && 
                                this.refs.title.value.length > 0 && 
                                this.refs.postText.value.length > 0)})
}

handleSubmit(){
    const postData = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        title: this.refs.title.value,
        author: "chrsch",
        body: this.refs.postText.value,
        category: this.refs.postCategory.value,
        voteScore:1,
        commentCount:0,
    }
    
    this.props.addPost(postData);
    this.setState( { redirectToNewPage: true });
}

render() {
    if (this.state.redirectToNewPage){
        return (
            <Redirect to="/"/>
        )
    }
    return(
        <div className='NewPost'>
            <MyAppBar title="readable - New Post"/>
            <Link to="/">
                <i className="divpad ms-fontColor-themeLighterAlt ms-bgColor-themeDarker ms-Icon ms-Icon--Back" aria-hidden="true">
                <span className="ms-font-m App">Back </span></i> 
            </Link>
            <form className="newPostForm" onSubmit={this.handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" placeholder="title" ref="title" onChange= {this.handleChange}/>
                </div>
                <div>
                    <label>Text:</label>
                    <textarea ref="postText" placeholder="edit text" onChange= {this.handleChange}/>
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
                    <DefaultButton
                        primary={ true }
                        data-automation-id='test'
                        disabled= {this.state.disabled}
                        text='Save post'
                        onClick={ this.handleSubmit}
                    />

                </div>

            </form>

        </div>

    )
}
}
function mapStateToProps(state){
    return {      
      categories: state.categoryReducer.categories
    }
  }
  const mapDispatchToProps = dispatch => ({
    addPost: (data) => dispatch(addNewPost(data)),
       
  });
export default withRouter(connect (mapStateToProps, mapDispatchToProps) (NewPost));