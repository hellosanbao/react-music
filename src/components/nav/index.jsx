import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'store/action'

import './nav.scss'
class Product extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div className="fixedNav">
               <div className="bottomNavBox">
                    <div className="bottomNav flex-warp">
                        <div className="item flex-con">
                            <i className="icon-wangyiyunyinle iconfont"></i>
                            <p>发现音乐</p>
                        </div>
                        <div className="item flex-con">
                            <i className="icon-yinyue iconfont"></i>
                            <p>我的音乐</p>
                        </div>
                        <div className="item flex-con active">
                            <i className="icon-pengyou iconfont"></i>
                            <p>朋友</p>
                        </div>
                        <div className="item flex-con">
                            <i className="icon-user iconfont"></i>
                            <p>账号</p>
                        </div>
                    </div>
                </div> 
            </div>)
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
)(Product);