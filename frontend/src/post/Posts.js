import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { Link, withRouter} from 'react-router-dom'
import { getPost} from './PostActions'


class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      sortField: props.sortField,
      sortOrder: props.sortOrder

    }
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);

  }

  handleSortChange(event){
    this.setState ({sortField: event.target.value});
  }
  handleSortOrderChange(event){
    this.setState ({sortOrder: event.target.value});
  }

  render(){
      return (
        <div className='ms-Grid'>
          <div className='ms-Grid-row divLeftRight'>
            <div className='ms-Grid-col ms-sm6 ms-md8 ms-lg9'>
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
            </div>
            <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg3'>
              <Link to="/NewPost"> 
              <i className="divpad ms-fontColor-themeLighterAlt ms-bgColor-themeDarker ms-Icon ms-Icon--CalculatorAddition" aria-hidden="true">
                <span className="ms-font-m App">New Post </span></i> 
              </Link>
            </div>
          </div>
    		  <ul className='ms-Grid post-list'>
            {
              this.props.posts && this.props.posts
                .filter((post) => ((!this.props.match.params.category) || (this.props.match.params.category === post.category)))
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
            .map((item)=> (
                item && 
                <li key={item.id}>
                  <Post post={item}/>
                </li>
            ))}
			    </ul>
		    </div>
	    );}
}

function mapStateToProps(state, ownProps){
  return {
    posts: state.postReducer.posts,
    categoryFilter: state.filterReducer.filter,
    sortField: ownProps.sortField,
    sortOrder: ownProps.sortOrder
  }
}

const mapDispatchToProps = dispatch => ({
  getPost: (post) => dispatch(getPost(post))
     
});

export default withRouter(connect (mapStateToProps,mapDispatchToProps) (Posts))