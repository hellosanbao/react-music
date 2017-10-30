import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'store/action'

import './gdlist.scss'

class GdList extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className='gdlistWarp'>B组件{this.props.states.test}</div>
        )
    }
}

function mapStateToProps(state){
    return {
        states:state.testStore
    }
}

function mapDispatchToProps (dispatch){
    return {
        handerTest:bindActionCreators(actions,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GdList);