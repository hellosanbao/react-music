import React from 'react'
import './tips.scss'
class Tips extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div className="tipsWarp">
                    <ul className="flex-warp">
                        <li className="flex-con item">
                            <i className="iconfont icon-shouyinji"></i>
                            <p className="title">私人FM</p>
                        </li>
                        <li className="flex-con item">
                            <i className="iconfont icon-rili"></i>
                            <p className="title">每日推荐</p>
                        </li>
                        <li className="flex-con item">
                            <i className="iconfont icon-gedanshouluon"></i>
                            <p className="title">歌单</p>
                        </li>
                        <li className="flex-con item">
                            <i className="iconfont icon-paihang"></i>
                            <p className="title">排行榜</p>
                         </li>
                    </ul>
                </div>)
    }
}
export default Tips;