import React, { Component } from 'react';
import './App.css';
import MyAppBar from './app/MyAppBar'
import Categories from './category/Categories'
import Posts from './post/Posts'
import NewPost from './post/NewPost'
import PostDetail from './post/PostDetail'
import {fetchCategories} from './category/CategoryActions'
import {fetchPosts} from './post/PostActions'
import {connect} from 'react-redux'
import { Route,  withRouter, Switch } from 'react-router-dom'

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from '@uifabric/icons';

// Register icons and pull the fonts from the default SharePoint cdn:
initializeIcons();



class App extends Component {
 

  componentDidMount(){
    this.props.fetchCategories();
    this.props.fetchPosts();
  }


  render() {

    return (
      <Fabric>
        <div className='App'>
          <Switch>
            <Route exact path="/"  render={() => (
              <div className="ms-Grid App-Default">
              <MyAppBar title="readable show all posts"/>

                <div className="ms-Grid-row App-data">
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                    <Categories/>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg9">
                    <Posts sortField="voteScore" sortOrder="desc"/>
                  </div>
                </div>
              </div>
            )}/>
            <Route exact path="/NewPost"  render={() => (<NewPost/>)}/>
            <Route exact path='/Post/:id'  render={() => (<PostDetail/>)}/>
            <Route exact path='/:category'  render={() => (
                <div className="App-Default">
                  <MyAppBar title="readable show all posts"/>
                  <div className="App-data">
                    <Categories/>
                    <Posts sortField="voteScore" sortOrder="desc"/>
                  </div>
                </div>
              )
            }/>
            <Route exact path='/:category/:id'  render={() => (<PostDetail/>)}/>
            
          </Switch>
        </div>
      </Fabric>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: ()=> dispatch(fetchPosts())
  
});

export default withRouter(connect (null, mapDispatchToProps) (App));
