import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'store/action'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SongList from 'components/songlist/songlist.jsx'

import './search.scss'
import $ from 'jquery'
import 'static/js/swiper.min.js'

var swiper1,swiper2

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state={
            keyword:'',
            suggestResult:{},
            addRes:false,
            onSearchDom:''
        }
    } 

    componentDidMount=()=>{
        setTimeout(()=>{
            this.domMountComplete()
        },50)
    }

    timer=null
    searchChange=(e)=>{
        this.setState({
            keyword:e.target.value
        })
        //搜索建议
        // this.timer && clearTimeout(this.timer)
        // this.timer = setTimeout(()=>{
        //     wyx.ajax({
        //         url:'/search/suggest',
        //         data:{
        //             keywords:this.state.keyword,
        //             limit:30,
        //             type:1
        //         },
        //         dataType:'json',
        //         success:(res)=>{
        //             if(res.code==200){
        //                 if(res.code==200){
        //                     this.setState({
        //                         suggestResult:res.result
        //                     })
        //                 }
        //             }
        //         }
        //     })
        // },300)
    }
    calcNavWidth=()=>{
        var w=0
        $(".searchNavItem").each((ind,el)=>{
            w+=$(el).outerWidth()
        })
       $(".searchNavList").width(w) 
       $(".swiper-container1 .swiper-slide").each((ind,ele)=>{
            $(ele).width($(ele).find('span').width())
       })
       $(".swiper-container1 .swiper-slide").on('click',function(){
           var ind=$(this).index();
           swiper2.slideTo(ind, 300, true);
       })
    }
    domMountComplete=()=>{}

    initList=()=>{
        var _this=this;
        if(!swiper1){
            this.calcNavWidth();
            setTimeout(function() {
                swiper1 = new Swiper(".swiper-container1",{
                    slidesPerView : 'auto',
                    freeMode : true,
                })
            }, 20);
            
        }
        
        swiper2 = new Swiper(".swiper-container2",{
            onSlideChangeStart:(swiper)=>{
                var ind = swiper.realIndex
                $(".swiper-container1 .swiper-slide").eq(ind).addClass('active').siblings(".swiper-slide").removeClass("active");
                if(ind>2){
                    swiper1.slideTo((ind-2), 300, true);
                }else{
                    swiper1.slideTo((ind-6), 300, true);
                }
            }
        })
        
    }

    searchEvent=(e)=>{
        if(e.keyCode=='13'){
            
            swiper1=null;
            var keyword=this.searInput.value
            this.state.keyword=keyword
            $(e.target).blur();
            this.research=true;
            this.setState({
                onSearchDom:'',
                addRes:true
            },()=>{
                setTimeout(()=>{
                    $(".serchResult").show();
                    this.initList()
                }, 20);
            })
            
            $('html,body').addClass('noScroll')
        }
    }
    onSearch=()=>{
        $('html,body').addClass('noScroll')
        var onSearchDom = (<div className="searchIndex">searchIndex</div>)

        if(!this.state.addRes){
            this.setState({
                onSearchDom
            })
        }
    }
    closeSearch=()=>{
        this.searInput.value='';
        this.setState({
            addRes:false,
            onSearchDom:'',
            keyword:'',
        })
        $('html,body').removeClass('noScroll')
    }
    render(){
        var DQlist='',GSlist='',ZJlist='',GDlist='',SPlist='',ZBDTlist='',YHlist=''

        if(this.state.addRes){
            DQlist=(<SongList slideBlock='DQlist'  keyword={this.state.keyword}/>)
            GSlist=(<SongList slideBlock='GSlist'  keyword={this.state.keyword}/>)
            ZJlist=(<SongList slideBlock='ZJlist'  keyword={this.state.keyword}/>)
            GDlist=(<SongList slideBlock='GDlist'  keyword={this.state.keyword}/>)
            SPlist=(<SongList slideBlock='SPlist'  keyword={this.state.keyword}/>)
            ZBDTlist=(<SongList slideBlock='ZBDTlist'  keyword={this.state.keyword}/>)
            YHlist=(<SongList slideBlock='YHlist'  keyword={this.state.keyword}/>)
        }
        

        return (
            <div className="searchWrap flex-wrap flex-vertical">
                <div className="headerWrap">
                    <div className="headerNr flex-hv-center">
                        <div className="searchInp flex-warp">
                            <input type="text" className="flex-con iconfont" onFocus={this.onSearch} ref={(input)=>this.searInput=input} placeholder="&#xe738;&nbsp;搜索音乐、视频、电台" onKeyDown={this.searchEvent}/> 
                        </div>
                        <div className="close" onClick={this.closeSearch}>取消</div>
                    </div>
                </div>
                {/* 热门搜索*/}
                <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                    {this.state.onSearchDom}
                </ReactCSSTransitionGroup>
                {/* 搜索建议 */}
                <div className="searchSuggest"></div>
                {/* 搜索结果 */}
                <div className="serchResult flex-con flex-warp flex-vertical" key={new Date()}>
                    <div className="seachNavContent">
                        <div className="swiper-container swiper-container1">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide active"><span>单曲</span></div>
                                <div className="swiper-slide"><span>歌手</span></div>
                                <div className="swiper-slide"><span>专辑</span></div>
                                <div className="swiper-slide"><span>歌单</span></div>
                                <div className="swiper-slide"><span>视频</span></div>
                                <div className="swiper-slide"><span>主播电台</span></div>
                                <div className="swiper-slide"><span>用户</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="searNr">
                        <div className="swiper-container swiper-container2" style={{height:'100%'}}>
                            <div className="swiper-wrapper" style={{height:'100%'}}>
                                {/* 单曲 */}
                                <div className="swiper-slide">
                                    {DQlist}
                                    {/* <SongList slideBlock='DQlist' ref='bbb' keyword={this.state.keyword}/> */}
                                </div>
                                {/* 歌手 */}
                                <div className="swiper-slide">{GSlist}</div>
                                {/* 专辑 */}
                                <div className="swiper-slide">{ZJlist}</div>
                                {/* 歌单 */}
                                <div className="swiper-slide">{GDlist}</div>
                                {/* 视频 */}
                                <div className="swiper-slide">{SPlist}</div>
                                {/* 主播电台 */}
                                <div className="swiper-slide">{ZBDTlist}</div>
                                {/* 用户 */}
                                <div className="swiper-slide">{YHlist}</div>
                                {/* 单曲 */}
                            </div>
                        </div>
                    </div>
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
        mapAction:bindActionCreators(actions,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
