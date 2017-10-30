import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { Link, withRouter} from 'react-router-dom'
import PlusIcon from 'react-icons/lib/fa/plus-square'

class Posts extends Component {
  /*getDate(ts){
    
  }*/

  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      sortField: props.sortField,
      sortOrder: props.sortOrder

    }
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.checkCategory = this.checkCategory.bind(this);

  }
/* toggleClass() {
    const currentState= this.state.dropdown;
    //this.setState( {dropdown : !currentState});
  }
*/
  handleSortChange(event){
    console.log('event:', event);
    this.setState ({sortField: event.target.value});
  }
  handleSortOrderChange(event){
    console.log('event:', event);
    this.setState ({sortOrder: event.target.value});
  }

  checkCategory(post) {
    return (this.props.categoryFilter ===null||this.props.categoryFilter.category === post.category)
  }

  render(){
    console.log('Postprops', this.props);
      return (
        <div className='post-box'>
          <label>sort by </label>
          <select value={this.state.sortField} onChange={this.handleSortChange}>
            <option value="timestamp">Date</option>
            <option value="voteScore">Score</option>
            <option value="author">Author</option>
            <option value="title">Title</option>
          </select>
          <select value={this.state.sortOrder} onChange={this.handleSortOrderChange}>
            <option value="asc">ascending</option>
            <option value="desc">descending</option>
          </select>
          <Link to="/NewPost" className='post-LinkNew' align="right"> <PlusIcon size={30} color='#1f6421'/> </Link>
    		  <ul className='post-list'>
          <div className='post-item-header'>
                  <div className='post-author'>Author <span id="headerAuthorSort" className="sortOrderUp"></span></div>
                  <div className='post-title'>Title</div>
                  <div className='post-category'>Category</div>
                  <div className='post-time'>Datum <span id="headerDateSort"></span></div>
                  <div className='post-voteScore'>Score <span id="headerDateSort">&#9650;</span></div>
          </div>
            {
              this.props.posts && this.props.posts
                .filter((post) => (this.props.categoryFilter &&((this.props.categoryFilter.category === "All") || (this.props.categoryFilter.category === post.category))))
                .sort(
               (a,b)=> { 
                var val1 = a.voteScore;
                var val2 = b.voteScore;
                if (this.state.sortField === 'voteScore') 
                  if (this.state.sortOrder === 'asc') {
                    val1 = a.voteScore;
                    val2 = b.voteScore;
                  } else {
                    val1 = b.voteScore;
                    val2 = a.voteScore;
                  }
                if (this.state.sortField === 'timestamp') 
                  if (this.state.sortOrder === 'asc') {
                      val1 = a.timestamp;
                      val2 = b.timestamp;
                    } else {
                      val1 = b.timestamp;
                      val2 = a.timestamp;
                    }
                if (this.state.sortField === 'author') 
                  if (this.state.sortOrder === 'asc') {
                      val1 = a.author;
                      val2 = b.author;
                    } else {
                      val1 = b.author;
                      val2 = a.author;
                    }
                return val1 - val2;
              })
            .map((item)=> (item && 
              <li key={item.id}>
                <Post post={item} editMode='select'/>
                <div className='post-item'>
                  <div className='post-author'>{item.author}</div>
                  <div className='post-title'><Link to={'/post/' + item.id}>{item.title}</Link></div>
                  <div className='post-category'>{item.category}</div>
                  <div className='post-time'>{(new Date(item.timestamp)).toLocaleDateString("en-US")}</div>
                  <div className='post-voteScore'>Comments{item.commentCount}</div>
                  <div className='post-voteScore'>{item.voteScore}</div>
                  <div className='post-voteScore'>{item.deleted}</div>
                </div>
              </li>
            ))}
			    </ul>
		    </div>
	    );}
}

function mapStateToProps(state, ownProps){
  console.log('state2propsPosts', state);
  return {
    posts: state.postReducer.posts,
    categoryFilter: state.filterReducer.filter,
    sortField: ownProps.sortField,
    sortOrder: ownProps.sortOrder,
    name:'tyler'
  }
}

export default withRouter(connect (mapStateToProps) (Posts))