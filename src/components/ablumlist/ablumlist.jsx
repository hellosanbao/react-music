import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
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
                <Link to='/gdlist'><ListTitle title="推荐歌单"/></Link>
                <div className={`list flex-list ${this.props.lsatFull?"lastFull":""}`}>
                    {this.props.datas.map((item,index)=>{
                        switch (this.props.type){
                            case 'song':
                                return (<AblumItem datas={item} key={index}/>)
                            break;
                            case 'video':
                                return (<VideoItem datas={item} key={index}/>)
                            break;
                            case 'fs':
                                return (<VideoItem datas={item} key={index}/>)
                            break;
                            default:
                                return;
                        }
                    })}
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