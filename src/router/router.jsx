import React from 'react'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'

import Home from 'pages/home/home.jsx'

class routerMap extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Router basename='/'>
                <div>
                    <div>
                        <Route path="/" component={Home} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default routerMap




