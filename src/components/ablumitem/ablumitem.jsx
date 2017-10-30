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
                    <img src={this.props.datas.image} alt=""/>
                </div>
                <div className="txt ellipsis-2">{this.props.datas.title}</div>
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