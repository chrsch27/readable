import React, { Component } from 'react'
import '../App.css';
import { withRouter} from 'react-router-dom'
import * as actions from './CommentActions'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';



class Comment extends Component {

    constructor(props){
        super(props);
        this.state= {
            editMode: false,  //show, select, edit ,new
            disabled: true,
            author:this.props.comment.author,
            body:this.props.comment.body   
        }
        this.handleVote= this.handleVote.bind(this);
        this.delete= this.delete.bind(this);
        this.toggleEdit= this.toggleEdit.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    toggleEdit(){
        this.props.canBeEdited && this.setState({editMode: !this.state.editMode})
    }

    handleChange(event) {
        var change={}
        change[event.target.name]=event.target.value
        this.setState(change)
        this.setState ({ disabled: !((this.state.author.length > 0) && (this.state.body.length > 0))})
    }
    
    handleSubmit(){
        const commentData = {
            title: this.state.title,
            body: this.state.body,
            id: this.props.comment.id

        }
        this.props.editAComment(commentData);
        this.setState( { redirectToNewPage: true });
        this.setState({editMode: !this.state.editMode})
    }

    handleVote(vote){
        const postData = {
            id: this.props.comment.id,
            option: vote.currentTarget.getAttribute('data-automation-id')
        }
        this.props.editACommentVote(postData);
    }
    delete(){
        confirmAlert({
            title: 'Confirm to delete',                        // Title dialog
            message: 'Do you really want to delete this Comment?', // Message dialog
            childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => {this.props.deleteCommentById(this.props.comment.id);},    // Action after Confirm
            onCancel: () => alert('Not deleted'),      // Action after Cancel
          })
    }



    render(){
        return (
            <div className='Comment ms-fontColor-themeLighterAlt ms-bgColor-themeTertiary'>
                <div className='divLeftRight ms-font-s'>

                    <div >{this.state.author}</div>
                    <div>{(new Date(this.props.comment.timestamp)).toLocaleDateString("en-US")}</div>
                </div>
                {this.state.editMode
                    ?<input type="text" defaultValue={this.state.body} name="body" onChange={this.handleChange}/>
                    :<div className='ms-fontColor-themeDarker ms-bgColor-themeLighterAlt'> {this.state.body}</div>
                }
                <div className='divLeftRight ms-font-s'>
                    <div>
                        <label className='Label'>Vote: </label>
                        <label>{this.props.comment.voteScore}</label>
                        <div className="divLeftRight">
                            <div className="cursor divpad" 
                                onClick={this.handleVote} 
                                title='Vote +'
                                data-automation-id="upVote" >
                                <i className="ms-Icon ms-Icon--ChevronUpSmall" aria-hidden="true"/>
                            </div>
                            <div className="cursor divpad" 
                                onClick={this.handleVote} 
                                title='Vote -'
                                data-automation-id="downVote" >
                                <i className="ms-Icon ms-Icon--ChevronDownSmall" aria-hidden="true"/>
                            </div>
                            
                        </div>
                    </div>
                    <div>
                    {this.state.editMode ?
                        <div>
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
                            {/* <div>
                                <DefaultButton
                                    primary={ true }
                                    data-automation-id='test'
                                    disabled= {this.state.disabled}
                                    text='Save'
                                    style={ {width:30}}
                                    onClick={ this.handleSubmit}
                                />
                            </div>
                            <div>
                                <DefaultButton
                                    primary={ true }
                                    data-automation-id='test'
                                    text='Cancel'
                                    style={ {width:30}}
                                    onClick={ this.toggleEdit}
                                />
                            </div> */}
                        </div>
                        :
                        <div>
                            <div className ='cursor' title="Edit Comment" onClick={this.toggleEdit}> <i className="divpad ms-Icon ms-Icon--Edit" aria-hidden="true"></i></div>
                            <div className ='cursor' title="Delete Comment" onClick={this.delete}> <i className="divpad ms-Icon ms-Icon--Delete" aria-hidden="true"></i></div>
                        </div>
                    }
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(connect(null,actions)(Comment))