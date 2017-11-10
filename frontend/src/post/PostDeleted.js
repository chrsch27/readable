import React, { Component } from 'react'
import '../App.css';
import { Link} from 'react-router-dom'
import MyAppBar from '../app/MyAppBar'


class PostDeleted extends Component {

    render() {
        return(
            <div className='NewPost'>
                <MyAppBar title="readable - Post deleted or link broken"/>
                <Link to="/">
                    <i className="divpad ms-fontColor-themeLighterAlt ms-bgColor-themeDarker ms-Icon ms-Icon--Back" aria-hidden="true">
                    <span className="ms-font-m App">Back </span></i> 
                </Link>
                <div className="ms-font-xxl ms-fontColor-themeDarker ms-bgColor-themeLighterAlt">
                    404 -Post cannot be found. Probably deleted
                </div>

            </div>
        )
    }
}

export default PostDeleted;