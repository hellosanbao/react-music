
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'store/action'

import './songlist.scss'
import $ from 'jquery'

class SongList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            DQlist:[],
            GSlist:[],
            ZJlist:[],
            GDlist:[],
            SPlist:[],
            ZBDTlist:[],
            YHlist:[],
        }
    }
    getSearchDatas(params){
        var _this=this
        return new Promise((resolve, reject)=>{
                wyx.ajax({
                    url:'/search',
                    data:{...params.data,keywords:_this.props.keyword},
                    dataType:'json',
                    success(res){
                        resolve(res)
                    },
                    error(err){
                        reject(err)
                    }
                })
        });
    }

    componentWillMount=()=>{
        switch (this.props.slideBlock){
            case 'DQlist':
                this.compileDQ()
            break;
            case 'GSlist':
                this.compileGS()
            break;
            case 'ZJlist':
                this.compileZJ()
            break;
            case 'GDlist':
                this.compileGD()
            break;
            case 'SPlist':
                this.compileSP()
            break;
            case 'ZBDTlist':
                this.compileZBDT()
            break;
            case 'YHlist':
                this.compileYH()
            break;
            default:return;
        }
    }

    componentDidMount=()=>{ 
        this.drapLoad()
    }
    drapLoad=()=>{
        var _this = this;
        var doms = `.dqListWarp-${this.props.slideBlock}`
        $(doms).parent().on('scroll',function(){
            var top = $(this).scrollTop()
            var winh = $(this).outerHeight()
            var doch = $(".dqListWarp").outerHeight()
            if(doch-top<=winh){
                switch (_this.props.slideBlock){
                    case 'DQlist':
                    if(!this['DQlist']){
                        this['DQlist']=true
                        _this.getSearchDatas({data:{type:1},type:'DQlist'}).then((res)=>{
                            this['DQlist']=null
                            if(res.result.songs.length){
                                _this.DQlistHasmore=true
                            }else{
                                _this.DQlistHasmore=false
                            }
                            var DQlist=[...res.result.songs,..._this.state.DQlist]
                            _this.setState({
                                DQlist
                            })
                        })
                    }
                        
                    break;
                    case 'GSlist':
                        
                    break;
                    case 'ZJlist':
                        
                    break;
                    case 'GDlist':
                        
                    break;
                    case 'SPlist':
                        
                    break;
                    case 'ZBDTlist':
                        
                    break;
                    case 'YHlist':
                        
                    break;
                    default:return;
                }
            }
            
        })
    }

    compileDQ=()=>{
        this.getSearchDatas({data:{type:1},type:'DQlist'}).then((res)=>{
            console.log('单曲')
            // console.log(res)
            this.setState({
                DQlist:res.result.songs
            })
        })
    }
    compileGS=()=>{
        this.getSearchDatas({data:{type:100},type:'GSlist'}).then((res)=>{
            console.log('歌手')
            // console.log(res)
            this.setState({
                GSlist:res.result.artists
            })
        })
    }
    compileZJ=()=>{
        this.getSearchDatas({data:{type:10},type:'ZJlist'}).then((res)=>{
            console.log('专辑')
            // console.log(res)
            this.setState({
                ZJlist:res.result.albums
            })
        })
    }
    compileGD=()=>{
        this.getSearchDatas({data:{type:1000},type:'GDlist'}).then((res)=>{
            console.log('歌单')
            // console.log(res)
            this.setState({
                GDlist:res.result.playlists
            })
        })
    }
    compileSP=()=>{
        this.getSearchDatas({data:{type:1004},type:'SPlist'}).then((res)=>{
            console.log('视频')
            // console.log(res)
            this.setState({
                SPlist:res.result.mvs
            })
        })
    }
    compileZBDT=()=>{
        this.getSearchDatas({data:{type:1009},type:'ZBDTlist'}).then((res)=>{
            console.log('主播电台')
            // console.log(res)
            this.setState({
                ZBDTlist:res.result.djRadios || []
            })
        })
    }
    compileYH=()=>{
        this.getSearchDatas({data:{type:1002},type:'YHlist'}).then((res)=>{
            console.log('用户')
            // console.log(res)
            this.setState({
                YHlist:res.result.userprofiles
            })
        })
    }

    render(){
        let itemDom='';

        switch(this.props.slideBlock){
            case 'DQlist':
                if(this.state.DQlist.length && this.state.DQlist){
                    itemDom=this.state.DQlist.map((el,index)=>{
                        return (
                            <li className="DQlist item flex-warp flex-between flex-middle" key={index}>
                                <div className="left">
                                    <p className="name ellipsis">{el.name}</p>
                                    <p className="sqs ellipsis">{el.album.name}</p>
                                    <p className="desc ellipsis">{el.alias.map((el)=>{return el})}</p>
                                </div>
                                <div className="right flex-con flex-middle flex-warp flex-between">
                                    <i className={`iconfont ${el.mvid?'icon-shipin':''}`}></i>
                                    <i className="iconfont icon-more"></i>
                                </div>
                            </li>
                        )
                    })
                    var loadStr = this.DQlistHasmore?<div key={this.state.DQlist.length}>加载中</div>:<div key={this.state.DQlist.length}>没有更多</div>
                    itemDom.push(loadStr)
                }
            break;
            case 'GSlist':
            // console.log(this.state.GSlist)
            if(this.state.GSlist.length && this.state.DQlist){
                itemDom=this.state.GSlist.map((el,index)=>{
                    return (
                        <li className="GSlist item flex-warp flex-between flex-middle" key={index}>
                            <div className="coverImg"><img src={el.img1v1Url?el.img1v1Url:el.picUrl} alt=""/></div>
                            <div className="sinerName flex-con flex-warp flex-middle">
                                <div className="ellipsis">
                                    {el.name} {
                                        el.alias.length? <span className="alia" >({el.alias[0]})</span>:''
                                    }
                                </div>
                            </div>
                        </li>
                    )
                })
            }
            break;
            case 'ZJlist':
            if(this.state.ZJlist.length && this.state.ZJlist){
                itemDom=this.state.ZJlist.map((el,index)=>{
                    return (
                        <li className="ZJlist item flex-warp flex-between flex-middle" key={index}>
                            <div className="coverImg"><img src={el.img1v1Url?el.img1v1Url:el.picUrl} alt=""/></div>
                            <div className="sinerName flex-con flex-warp flex-middle">
                                <div className="txtWarp">
                                    <div className="ellipsis">
                                        {el.name} {
                                            el.alias.length? <span className="alia" >({el.alias[0]})</span>:''
                                        }
                                    </div>
                                    <div className="author ellipsis">{el.artist.name}
                                        <span className="time">{new Date(el.publishTime).format('yyyy-MM-dd')}</span> 
                                    </div>
                                </div>
                                
                            </div>
                        </li>
                    )
                })
                
            }
            break;
            case 'GDlist':
            if(this.state.GDlist.length && this.state.GDlist){
                itemDom=this.state.GDlist.map((el,index)=>{
                    return (
                        <li className="GDlist item flex-warp flex-between flex-middle" key={index}>
                            <div className="coverImg"><img src={el.coverImgUrl} alt=""/></div>
                            <div className="sinerName flex-con flex-warp flex-middle">
                                <div className="txtWarp">
                                    <div className="ellipsis">
                                        {el.name}
                                    </div>
                                    <div className="author ellipsis">
                                        {el.trackCount}首音乐  by {el.creator.nickname}， 播放{el.playCount}次
                                    </div>
                                </div>
                                
                            </div>
                        </li>
                    )
                })
            }
            break;
            case 'SPlist':
            if(this.state.SPlist.length && this.state.SPlist){
                itemDom=this.state.SPlist.map((el,index)=>{
                    return (
                        <li className="SPlist item flex-warp flex-between flex-middle" key={index}>
                            <div className="coverImg"><img src={el.cover} alt=""/></div>
                            <div className="sinerName flex-con flex-warp flex-middle">
                                <div className="txtWarp">
                                    <div className="ellipsis">
                                        {el.name}
                                    </div>
                                    <div className="author ellipsis">
                                        {el.artists.map((artist,ind)=>{
                                            if(ind+1!==el.artists.length){
                                                return artist.name+'/'
                                            }else{
                                                return artist.name
                                            }
                                        })}
                                    </div>
                                </div>
                                
                            </div>
                        </li>
                    )
                })
            }
            break;
            case 'ZBDTlist':
            if(this.state.ZBDTlist.length){
                itemDom=this.state.ZBDTlist.map((el,index)=>{
                    return (
                        <li className="ZBDTlist item flex-warp flex-between flex-middle" key={index}>
                            <div className="coverImg"><img src={el.picUrl} alt=""/></div>
                            <div className="sinerName flex-con flex-warp flex-middle">
                                <div className="txtWarp">
                                    <div className="ellipsis">
                                        {el.name}
                                    </div>
                                    <div className="author ellipsis">
                                        {el.dj.nickname}
                                    </div>
                                </div>
                                
                            </div>
                        </li>
                    )
                })
            }
            break;
            case 'YHlist':
            console.log(this.state.YHlist)
            if(this.state.YHlist.length && this.state.YHlist){
                itemDom=this.state.YHlist.map((el,index)=>{
                    return (
                        <li className="YHlist item flex-warp flex-between flex-middle" key={index}>
                        <div className="coverImg"><img src={el.avatarUrl} alt=""/></div>
                        <div className="sinerName flex-con flex-warp flex-middle">
                            <div className="txtWarp">
                                <div className="ellipsis">
                                    {el.nickname}
                                </div>
                                <div className="author ellipsis">
                                </div>
                            </div>
                            
                        </div>
                    </li>
                    )
                })
            }
            break;
            default:return;
        }
        
        return (<div className={`dqListWarp dqListWarp-${this.props.slideBlock}`}>
                    <ul className="dqList">
                        {itemDom}
                    </ul>
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
)(SongList);
// export default SongList
