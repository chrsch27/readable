import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {filterPostsByCategory} from '../post/PostActions'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';



class Categories extends Component {

  componentDidMount() {
    this.props.filterPosts("All")
  }

  render(){
    return (
      <div className='ms-Grid'>
        <h3 className='category-header'>Categories</h3>
        <ul className='category-list'>
          <li key='All'> 
            <Link to={"/"}><DefaultButton text="All Posts" /></Link>
          </li>
          {this.props.categories && this.props.categories.map((item)=>(
            <li key={item.name}>  
              <Link to={"/"+item.name}><DefaultButton text={item.name}/></Link>
            </li>
            )
          )}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({categoryReducer}){
  return {
    categories: categoryReducer.categories
  }
}

const mapDispatchToProps = (dispatch) => ({
   filterPosts: (category) => dispatch(filterPostsByCategory({category})),
  
});

export default connect (mapStateToProps, mapDispatchToProps) (Categories)