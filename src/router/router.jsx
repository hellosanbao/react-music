import React from 'react'
import {HashRouter as Router,Route,IndexRoute} from 'react-router-dom'

import Home from 'pages/home/home.jsx'
import Gdlist from 'pages/gdlist/gdlist.jsx'
import Container from 'pages/container/container.jsx'

class routerMap extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Router basename='/'>
                <div>
                    <Container>
                        <Route path='/home' component={Home} />
                        <Route path="/gdlist" component={Gdlist} />
                    </Container>
                </div>
            </Router>
        )
    }
}
export default routerMap




