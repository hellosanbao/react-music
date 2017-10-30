 import React from 'react'
 import { render } from 'react-dom'
 import {createStore} from 'redux'
 import {Provider} from 'react-redux'
 import RouterMap from './router/router'
 import './config.js'
 import './common.js'
 import store from 'store/store'

window.onresize = fonts
fonts()
function fonts(){
    var html = document.documentElement;
    var windowWidth = html.clientWidth>750?750:html.clientWidth;
    html.style.fontSize = windowWidth / 7.5 * 2 + 'px';
}
 import 'baseCss/base/common.scss'
 render(
     <Provider store={store}>
        <RouterMap/> 
     </Provider>,
    document.getElementById("app")
)
















