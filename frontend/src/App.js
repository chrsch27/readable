import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Categories from './category/Categories'
import Posts from './post/Posts'
import NewPost from './post/NewPost'
import PostDetail from './post/PostDetail'
import {fetchCategories} from './category/CategoryActions'
import {fetchPosts} from './post/PostActions'
import {connect} from 'react-redux'
import { Route,  withRouter } from 'react-router-dom'
import PlusIcon from 'react-icons/lib/fa/plus-square'

class App extends Component {

  componentDidMount(){
    this.props.fetchCategories();
    this.props.fetchPosts();
  }


  render() {
    return (

      <div className="App">
        <Route exact path="/"  render={() => {
          return(
            <div className="App-Default">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Readable</h1>
              </header>
              <div className="App-data">
                <Categories/>
                <Posts sortField="voteScore" sortOrder="desc"/>
              </div>
            </div>
          )}}/>
          <Route path="/NewPost"  render={() => {
            return(
              <div className="AppNewPost">
                <NewPost/>
              </div>
            )
          }}/>
          <Route path='/Post/:id'  render={() => {
            return(
              <div className="AppNewPost">
                <PostDetail/>
              </div>
            )
          }}/>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: ()=> dispatch(fetchPosts())
  
});

export default withRouter(connect (null, mapDispatchToProps) (App));
