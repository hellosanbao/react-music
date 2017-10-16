
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'store/action'

import 'baseCss/base/mixin.scss'

import Nav from 'components/nav'
import Search from 'components/search'

class Home extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Search/>
                <Nav/>
            </div>
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
)(Home);



