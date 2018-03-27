import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Register extends Component{
    constructor(props){
        super(props);
        this.state = { emailid:"",password:"",username:"",fname:"",lname:""}
        this.check = false;
        this.updateval = this.updateval.bind(this);
        this.updatecheck = this.updatecheck.bind(this);
        this.senddata = this.senddata.bind(this);
        this.validate = this.validate.bind(this);

      }
      updateval(e){
          console.log(e.target);
        let val = e.target.name;
        this.setState({[val]:e.target.value});
        console.log(val);
      }
      updatecheck(e){
        this.check = !this.check;
        console.log(this.check);
      }
      validate(){
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

         if(this.state.emailid.length!== 0 && this.state.password.length!== 0 && this.state.username.length!== 0 && this.state.fname.length!== 0 && this.check===true){
            if(this.state.emailid.match(emailReg)){
                if(this.state.password.length>6){
                    return true;
                }
                else{
                    alert('password must be 6 character long');
                    return false;
                }
            }
            else{
                alert('invalid email');
                return false;
            }     
         }
         else{
             alert('Field cannot be empty (except Lastname) ');
             return false;
         }
      }
      senddata(e){
        e.preventDefault();
        
        this.validate();
        
        if(this.validate()===true)
        {
            console.log(this.state);
            const url = "http://localhost:8080/insert";
            let fetchData = {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state)
            
            }
            console.log("fetchData",fetchData);
        
            fetch(url,fetchData)
            .then(res => res.json())
            .catch(function(error) {
            console.log("error in catch");
            });
        }
        
      }
    
      componentWillMount(){
        let last = localStorage.getItem("emailid");
        console.log(last);
        if(last!==null){
          this.props.history.push('/timeline/');
        }
      }

    render() {
      return (
        <div>
          <meta charSet="utf-8" />
          <title>Create An Account</title>
          <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
          <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
          
          <div className="container">
            <div className="content">
              <div className="content_rgt">
                <div className="register_sec">
                  <h1>Create An Account</h1>
                  <ul>
                    <li><span>Username</span><input placeholder="Enter your username" type="text" name="username" onChange={this.updateval} /></li>
                    <li><span>Password</span><input placeholder="Enter your password" type="password" name="password" onChange={this.updateval}/></li>
                    <li><span>Email</span><input placeholder="Enter your email" type="email" name="emailid" onChange={this.updateval}/></li>
                    <li><span>First Name</span><input placeholder="Enter your first name" type="text" name="fname" onChange={this.updateval}/></li>
                    <li><span>Last Name</span><input placeholder="Enter your last name" type="text" name="lname" onChange={this.updateval}/></li>
                    <li><input type="checkbox" onClick={this.updatecheck}/>I agree to Term &amp; Conditions</li>
                    <li><input defaultValue="Register" type="submit" onClick={this.senddata}/></li>
                  </ul>

                   <a href="http://localhost:8080/auth/google"><button class="loginBtn loginBtn--google">
                      Login with Google
                    </button>
                    </a>

                  <div className="addtnal_acnt">I already have an account.<Link to="/login">Login My Account !</Link></div>
                </div>
              </div>
              <div className="content_lft">
                <h1>Welcome from PPL!</h1>
                <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                <img src="images/img_9.png" alt /> </div>
            </div>
          </div>
          <div className="clear" />
       
        </div>
      );
    }
  };

export default Register;
