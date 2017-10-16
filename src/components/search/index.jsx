import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'store/action'

import AblumList from "components/ablumlist/ablumlist.jsx"

import './search.scss'
class Search extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="searchWrap flex-wrap flex-vertical">
                <div className="headerWrap">
                    <div className="headerNr flex-hv-center">
                        <div className="searchInp flex-warp">
                            <input type="text" className="flex-con" placeholder="搜索音乐、视频、电台" /> 
                        </div>
                        <div className="close">取消</div>
                    </div>
                </div>
                <div className="serchResult flex-con">
                    <AblumList/>
                </div>
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
)(Search);
