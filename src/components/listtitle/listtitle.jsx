import React from 'react'

import './listtitle.scss'

class ListTile extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div className="title">{this.props.title}  ></div>)
    }
}
export default ListTile;