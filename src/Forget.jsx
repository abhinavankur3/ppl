import React, { Component } from 'react';

class Forget extends Component{
  constructor(props){
    super(props);
    this.state={
      emailid:'',
      popup:false,
      msg:''
    }

    this.validate = this.validate.bind(this);
    this.sendreset = this.sendreset.bind(this);
    this.updatestate = this.updatestate.bind(this);

  }

  updatestate(e){
    this.setState({emailid:e.target.value});
    console.log('forget state ',this.state);
  }

  validate(){
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(this.state.emailid.length!== 0){
      if(this.state.emailid.match(emailReg)){
        return true;
      }
      else{
        alert('Invalid E-mail')
        return false;
      }
    }
    else{
      alert('Empty E-mail field')
      return false;
    }
  }

  sendreset(){
    this.validate();

    if(this.validate()===true)
        {
            console.log(this.state);
            const url = "http://localhost:8080/reset";
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
            })
            .then(res => {
              console.log('forget response ',res);
              if(res.msg!=='ok'){
                this.setState({msg:res.msg})       
              }
              else{
                
                this.setState({popup:true}) 
              }
            });
        }
  }

    render() {
      return (
        <div>
          <meta charSet="utf-8" />
          <title>Forgot Password</title>
          <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
          <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />

          {this.state.popup? <div className="popup_sec" id="pop_forgt">
            <div className="clos_btn"><img src="/images/clos.png" alt id="clos_pop" /></div>
            <div className="pop_hdr">A mail has been send to your e-mail Id for Reset Password Link</div>
            <div className="man_contnt">
              <span>Please Check Your Mail Box!</span>
              <input defaultValue="Ok" type="submit" />
            </div>
      </div> :''}
          
          <div className="container"> 
            <div className="content">
              <div className="content_rgt">
                <div className="register_sec">
                  <h1>Forgot Password</h1>
                  <ul>
                    <li><span>Enter E-mail ID</span><input placeholder="User@gmail.com" type="text" onChange={this.updatestate} /></li>
                    <li><input defaultValue="Submit" type="submit" onClick={this.sendreset}/></li>
                  </ul>
                </div>
              </div>
              <div className="content_lft">
                <h1>Welcome from PPL!</h1>
                <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                <img src="/images/img_9.png" alt /> </div>
            </div>
          </div>
          <div className="clear" />
          
          
        </div>
      );
    }
  };
  export default Forget;