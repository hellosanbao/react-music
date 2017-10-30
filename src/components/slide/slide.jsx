import React from 'react'
import Swiper from 'swiper'
import './slide.scss'
class Slide extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        setTimeout(()=>{
          new Swiper(".sliderComponent")  
        },20)
    }
    render(){
        var slideStr=''
        if(this.props.datas){
            slideStr =  this.props.datas.map((item,index)=>{
                return (<div className="swiper-slide" key={index}><img src={item.image} alt={item.title} /></div>)
            })
        } 
        return (<div className="slideWrap">
                    <div className="swiper-container sliderComponent">
                        <div className="swiper-wrapper">
                            {slideStr}
                        </div>
                    </div>
                </div>)
    }
}
export default Slide;