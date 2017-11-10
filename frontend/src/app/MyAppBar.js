import React, { Component } from 'react'


class MyAppBar extends Component {
    render(){
        return (
            <div>
                <div className="ms-font-su ms-fontColor-themeLighterAlt ms-bgColor-themePrimary">{this.props.title}</div>
            </div>
        )
    }
}

export default MyAppBar