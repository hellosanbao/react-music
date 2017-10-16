import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'store/action'

import "./ablumlist.scss"

import AblumItem from 'components/ablumitem/ablumitem.jsx'
import VideoItem from 'components/videoitem/videoitem.jsx'
import ListTitle from 'components/listtitle/listtitle.jsx'

class AblumList extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="ablumListBox">
                <ListTitle title="推荐歌单"/>
                <div className="list flex-list">
                    <AblumItem/>
                    <AblumItem/>
                    <AblumItem/>
                    <AblumItem/>
                    <AblumItem/>
                    <AblumItem/> 
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
)(AblumList);