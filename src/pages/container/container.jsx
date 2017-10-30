import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './container.scss'
class Container extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props.children)
        return (<ReactCSSTransitionGroup
                transitionName="examples"
                component="div"
                className='containerWarp'
                transitionEnterTimeout={100000}
                transitionLeaveTimeout={100000}>
                    <div key={Math.random()} style={{position:"absolute", width: "100%"}} >
                        {this.props.children}
                    </div>
                </ReactCSSTransitionGroup>)
    }
}
export default Container;