import React, { Component } from 'react'
import '../App.css';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { deletePostById, editAPostVote, editAPost, getPost} from './PostActions'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';



class Post extends Component {
    constructor(props){
        
        super(props);
        this.state= {
            editMode: false,  //show, select, edit ,new
            redirectToHomePage: false,
            disabled: true,
            title:this.props.post.title,
            postText:this.props.post.body ,
            redirectToDetail:false 
        }
       
        this.handleVote= this.handleVote.bind(this);
        this.delete= this.delete.bind(this);
        this.toggleEdit= this.toggleEdit.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.deleteConfirmed= this.deleteConfirmed.bind(this);
        this.getPostLink= this.getPostLink.bind(this);
    }

    componentWillMount(){

        this.props.getPost(this.props.post);
    }

    handleVote(vote){

        const postData = {
            id: this.props.post.id,
            option: vote.currentTarget.getAttribute('data-automation-id')
        }
        this.props.editAPostVote(postData);
    }

    toggleEdit(){
        this.props.canBeEdited && this.setState({editMode: !this.state.editMode})
    }

    getPostLink(){
        this.props.getPost(this.props.post)
        this.setState({redirectToDetail:true})
    }

    handleChange(event) {
        var change={}
        change[event.target.name]=event.target.value
        this.setState(change)
        this.setState ({ disabled: !((this.state.title.length > 0) && (this.state.postText.length > 0))})
    }
    
    handleSubmit(){
        const postData = {
            title: this.state.title,
            body: this.state.postText,
            id: this.props.post.id
        }
        this.props.editPost(postData,this.props.post.id);
        this.setState( { redirectToNewPage: true });
        this.setState({editMode: !this.state.editMode})
    }

    delete(id){
        confirmAlert({
            title: 'Confirm to submit',                        // Title dialog
            message: 'Do you really want to delete this Post?', // Message dialog
            childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => {  this.props.deletePost(this.props.post.id); 
                                this.setState( { redirectToHomePage: true });},    // Action after Confirm
            onCancel: () => alert('Not deleted'),      // Action after Cancel
          })
    }
    deleteConfirmed() {
        this.props.deletePost(this.props.post.id); 
        this.setState( { redirectToHomePage: true });
    }

    render() {
        if (this.state.redirectToHomePage){
            return (
                <Redirect to="/"/>
            )
        }
        if (this.state.redirectToDetail){
            return (
                <Redirect to={"/Post/"+ this.props.post.id}/>
            )
        }
        return(
            <div className="Post">
                <div className='divLeftRight ms-fontColor-themeLighterAlt ms-bgColor-themeDarker'>
                    <div>
                        <label className='Label'>Author: </label>
                        <label>{this.props.post.author}</label>
                    </div>
                    <div>
                        <label className='Label'>Date: </label>
                        <label>{(new Date(this.props.post.timestamp)).toLocaleDateString("en-US")}</label>
                    </div>
                </div>

                <div className='ms-font-xl ms-fontColor-themeLighterAlt ms-bgColor-themePrimary'>
                    {this.state.editMode
                        ?<input type="text" defaultValue={this.props.post.title} name="title" id="title" onChange={this.handleChange}/>
                        :<label>{this.state.title}</label>
                    }
                </div>
                <div className='postBody'>
                {this.state.editMode
                    ?<textarea defaultValue={this.props.post.body} name="postText" id="postText" onChange={this.handleChange}/>
                    :<label>{this.state.postText}</label>
                }
                </div>
                <div className='divLeftRight ms-fontColor-themeLighterAlt ms-bgColor-themeDarker'>
                    <div>
                        <label className='Label'>Category: </label>
                        <label>{this.props.post.category}</label>
                    </div>
                    <div>
                        <label className='Label'>Comments: </label>
                        <label>{this.props.post.commentCount}</label>
                        
                        
                    </div>
                </div>
                <div className='divLeftRight ms-fontColor-themeLighterAlt ms-bgColor-themeDarker'>
                    <div> 
                        <label className='Label'>Vote: </label>
                        <label>{this.props.post.voteScore}</label>
                        <div className="divLeftRight">
                            <div className="cursor divpad ms-fontColor-themeLighterAlt ms-bgColor-themeDarker" 
                                onClick={this.handleVote} 
                                title="Vote +"
                                data-automation-id="upVote" >
                                <i className="ms-Icon ms-Icon--ChevronUpSmall" aria-hidden="true"/>
                            </div>
                            <div className="cursor divpad ms-fontColor-themeLighterAlt ms-bgColor-themeDarker" 
                                onClick={this.handleVote} 
                                title="Vote -"
                                data-automation-id="downVote" >
                                <i className="ms-Icon ms-Icon--ChevronDownSmall" aria-hidden="true"/>
                            </div>
                            
                        </div>
                    </div>
                    <div>
                        
                        {this.state.editMode ?
                        <div>                                
                            {/* <div className ='cursor' onClick={this.handleSubmit}> <i className="divpad ms-Icon ms-Icon--Accept" aria-hidden="true"></i></div>
                            <div className ='cursor' onClick={this.toggleEdit}> <i className="divpad ms-Icon ms-Icon--Cancel" aria-hidden="true"></i></div> */}
                            <IconButton
                                disabled= {this.state.disabled}
                                style={{backgroundColor:'transparent', width: '20px', height: '20px'}}
                                onClick={ this.handleSubmit}
                                iconProps={ { iconName: 'Accept', className: 'ms-bgColor-themeDarker ms-fontColor-themeLighterAlt' } }
                                title='Save'
                                ariaLabel='Save'
                            />
                            <IconButton
                                primary={ true }
                                style={{backgroundColor:'transparent', width: '20px', height: '20px'}}
                                data-is-focusable={ true }
                                onClick={ this.toggleEdit}
                                iconProps={ { iconName: 'Cancel', className: 'ms-bgColor-themeDarker ms-fontColor-themeLighterAlt' } }
                                title='Cancel'
                                ariaLabel='Cancel'
                            />
                        </div>
                        :
                        <div>
                            {this.props.canBeEdited
                                ?<div className ='cursor' title="Edit" onClick={this.toggleEdit}> <i className="divpad ms-Icon ms-Icon--Edit" aria-hidden="true"></i></div>
                                
                                :<div className ='cursor' title=' to Post Detail' onClick={this.getPostLink}> <i className="divpad ms-Icon ms-Icon--NavigateForward" aria-hidden="true"></i></div>
                                //<Link to={"/Post/" + this.props.post.id}><i className=" divpad ms-Icon ms-Icon--NavigateForward ms-fontColor-themeLighterAlt" aria-hidden="true"></i></Link>
                            }
                            <div className ='cursor' title='delete' onClick={()=>this.delete(this.props.post.id)}> <i className="divpad ms-Icon ms-Icon--Delete" aria-hidden="true"></i></div>
                            
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    editAPostVote: (data) => dispatch(editAPostVote(data)),
    deletePost: (id) => dispatch(deletePostById(id)),
    editPost: (data,id) => dispatch(editAPost(data,id)),
    getPost: (post) => dispatch(getPost(post))
       
  });
export default  withRouter(connect(null,mapDispatchToProps)(Post))