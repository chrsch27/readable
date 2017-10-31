import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { Route, Link } from 'react-router-dom'
import {filterPostsByCategory} from '../post/PostActions'



class Categories extends Component {

  componentDidMount() {
    this.props.filterPosts("All")
  }

  render(){
    return (
      <div className='category-box'>
        <h3 className='category-header'>Categories</h3>
        <ul className='category-list'>
          <li key='All'> 
            <button className='category-button'  onClick={() => this.props.filterPosts('All')}>All Posts</button>
          </li>
          {this.props.categories && this.props.categories.map((item)=>(
            <li key={item.name}>  
              <button className='category-button'  onClick={() => this.props.filterPosts(item.name)}>{item.name}</button>
            </li>
            )
          )}
        </ul>
      </div>
    )
  }
}

//<Link to={'/'+ item.name} className="open-search-link">{item.name}</Link>

function mapStateToProps({categoryReducer}){
  return {
    categories: categoryReducer.categories
  }
}

const mapDispatchToProps = (dispatch) => ({
   filterPosts: (category) => dispatch(filterPostsByCategory({category})),
  
});

export default connect (mapStateToProps, mapDispatchToProps) (Categories)