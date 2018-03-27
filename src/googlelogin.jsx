import React, { Component } from 'react';

class Googlelogin extends Component{
    constructor(props){
        super(props);
    }
    render(){
        localStorage.setItem('curremail',this.props.match.params.emailid);
        this.props.history.push('/timeline/');
        return(
            <h1>Please Wait</h1>
        )
    }
}

export default Googlelogin;