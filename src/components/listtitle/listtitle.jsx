import React from 'react'

import './listtitle.scss'

class ListTile extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        
    }
    render(){
        return (<div className="homeTitle">{this.props.title}  <i className="iconfont icon-next"></i></div>)
    }
}
export default ListTile;