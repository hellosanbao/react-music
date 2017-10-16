import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'store/action'

import './ablumitem.scss';

class AblumItem extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="ablumItemBox">
                <div className="img">
                    <img src="" alt=""/>
                </div>
                <div className="txt ellipsis-2">全球lol背景音乐集锦助你超神五杀游戏背景音乐</div>
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
)(AblumItem);