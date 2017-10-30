
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'store/action'

import 'baseCss/base/mixin.scss'
import 'node_modules/swiper/dist/css/swiper.min.css'
import "./home.scss"

import Nav from 'components/nav'
import Search from 'components/search'
import AblumList from "components/ablumlist/ablumlist.jsx"
import Slide from "components/slide/slide.jsx"
import Tips from "components/tips/tips.jsx"

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[], //推荐歌单
            mvList:[], //推荐mv
            fsList:[], //独家放送
            nsList:[], //最新音乐
            bannerList:[], //banner
            dtList:[] // 推荐电台
        }
    }
    componentDidMount=()=>{
        var _this=this
        //banner
        wyx.ajax({
            url:'/banner',
            dataType:'json',
            showLoading:true,
            success:function(res){
                // console.log(res)
                var bannerList= res.banners.map((el,i)=>{
                    return {
                        image:el.pic,
                        title:el.typeTitle,
                        url:el.adLocation
                    }
                })
                if(res.code==200){
                    _this.setState({bannerList})
                }
            }
        })
        //推荐歌单
        wyx.ajax({
            url:'/personalized',
            dataType:'json',
            showLoading:true,
            success:function(res){
                // console.log(res)
                var list= res.result.map((el,i)=>{
                    return {
                        image:el.picUrl,
                        title:el.name,
                        playCount:el.playCount
                    }
                })
                if(res.code==200){
                    _this.setState({list})
                }
            }
        })
        //推荐mv
        wyx.ajax({
            url:'/personalized/mv',
            dataType:'json',
            showLoading:true,
            success:function(res){
                // console.log(res)
                var mvList= res.result.map((el,i)=>{
                    return {
                        image:el.picUrl,
                        title:el.name,
                        author:el.artistName,
                        playCount:el.playCount
                    }
                })
                if(res.code==200){
                    _this.setState({mvList})
                }
            }
        })
        //独家放送
        wyx.ajax({
            url:'/personalized/privatecontent',
            dataType:'json',
            showLoading:true,
            success:function(res){
                // console.log(res)
                var fsList= res.result.map((el,i)=>{
                    return {
                        image:el.picUrl,
                        title:el.name,
                        author:el.artistName,
                        playCount:el.playCount
                    }
                })
                if(res.code==200){
                    _this.setState({fsList})
                }
            }
        })
        //最新音乐
        wyx.ajax({
            url:'/top/playlist?offset=6&limit=6',
            dataType:'json',
            showLoading:true,
            success:function(res){
                // console.log(res)
                var nsList= res.playlists.map((el,i)=>{
                    return {
                        image:el.coverImgUrl,
                        title:el.name,
                        author:el.artistName,
                        playCount:el.playCount
                    }
                })
                if(res.code==200){
                    _this.setState({nsList})
                }
            }
        })
        // 推荐电台
        wyx.ajax({
            url:'/personalized/djprogram',
            dataType:'json',
            showLoading:true,
            success:(res)=>{
                // console.log(res)
                var dtList= res.result.map((el,i)=>{
                    return {
                        image:el.picUrl,
                        title:el.name,
                        playCount:el.playCount,
                        id:el.id
                    }
                })
                if(res.code==200){
                    _this.setState({dtList})
                }
            }
        })
         
    }
    render(){
        return (
            <div className="homePage">
                <Search/>
                <Slide datas={this.state.bannerList}/>
                <Tips/>
                <div className="mainContent">
                    <AblumList datas={this.state.list} type="song"/>
                    <AblumList datas={this.state.mvList}type="video"/>
                    <AblumList datas={this.state.fsList} type="fs" lsatFull="true"/>
                    <AblumList datas={this.state.nsList} type="song"/>
                </div>
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



