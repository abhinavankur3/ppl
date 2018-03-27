import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Login extends Component{

  constructor(props){
    super(props);
    this.state={emailid:"",password:""};
    this.remember = false;
    
    this.loginupdate = this.loginupdate.bind(this);
    this.verify = this.verify.bind(this);
    this.loginrem = this.loginrem.bind(this);
  }
  loginrem(){
    this.remember = !this.remember;
  }
  loginupdate(e){
    this.setState({[e.target.name]:e.target.value});
  }
  verify(){
    const url = "http://localhost:8080/find";
    let fetchData = {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    
    }
    console.log("fetchData",fetchData.body);
    fetch(url,fetchData)
    .then(res => res.json())
    .catch(function(error) {
      console.log("error in login catch");
    })
    .then(res => {
      console.log(res);
      //alert(res.msg);
      if(res.msg==='logged In'){
        console.log('logged in',this.props);
        localStorage.setItem('curremail',this.state.emailid);
        if(this.remember){
          localStorage.setItem('emailid',this.state.emailid);
        }
        

        this.props.history.push('/timeline/');
      }
   });
  }
    componentWillMount(){
      console.log("will update",this.props.match.params.id);
      if(this.props.match.params.id!== undefined){
        const url = "http://localhost:8080/check";
          let fetchData = { 
            method: 'POST', 
            headers: {
              'Content-type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({_id:this.props.match.params.id})
          
          }
          console.log("fetchData",fetchData.body);
          fetch(url,fetchData)
          .then(res => res.json())
          .catch(function(error) {
            console.log("error in login catch");
          })
          .then(res => {
            console.log(res);
            this.setState({emailid:res[0].emailid})
          });
      }
    }
    
    render(){
      return (
        <div>
          <meta charSet="utf-8" />
          <title>Login Account</title>
          <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
          <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
          
          
            
              <div className="content_rgt">
                <div className="login_sec">
                  <h1>Log In</h1>
                  <ul>
                    <li><span>Email-ID</span><input placeholder={this.state.emailid} name="emailid" type="text" onChange={this.loginupdate} /></li>
                    <li><span>Password</span><input placeholder="Enter your password" name="password"  type="text" onChange={this.loginupdate} /></li>
                    <li><input type="checkbox" onClick={this.loginrem}/>Remember Me</li>
                    <li><input defaultValue="Log In" type="submit" onClick={this.verify} /><Link to='/login/forget'><a>Forgot Password</a></Link></li>
                  </ul>

                   <a href="http://localhost:8080/auth/google"><button class="loginBtn loginBtn--google">
                      Login with Google
                    </button></a>

                  <div className="addtnal_acnt">I do not have any account yet.<Link to="/register">Create My Account Now !</Link></div>
                </div>
              </div>
              <div className="content_lft">
                <h1>Welcome from PPL!</h1>
                <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                <img src="/images/img_9.png" alt /> </div>
          
         
          <div className="clear" />

        </div>
      );
    }
  };

  export default Login;