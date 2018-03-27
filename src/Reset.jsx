import React , {Component} from 'react';

class Reset extends Component{
    constructor(props){
        super(props);

        this.state={
            id:this.props.match.params.id,
            password:'',
            confirmpass:'',
        }

        this.updatestate = this.updatestate.bind(this);
        this.sendpass = this.sendpass.bind(this);

    }

    updatestate(e){
        this.setState({[e.target.name]:e.target.value})
        console.log('password and confirm password ',this.state)
    }

    sendpass(e){
        
            console.log("will update",this.props.match.params.id);
            if(this.state.password===this.state.confirmpass){
              const url = "http://localhost:8080/password";
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
                  if(res.length>0){
                      this.props.history.push(`/login/${res[0]._id}`);
                  }
                });
            }
            else{
                alert('Password not same')
            }
    }

        render() {
          return (
            <div>
              <meta charSet="utf-8" />
              <title>Reset Password</title>
              <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
              <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
              
              <div className="container">
                <div className="content">
                  <div className="content_rgt">
                    <div className="register_sec">
                      <h1>Reset Password</h1>
                      <ul>
                        <li><span>Enter New Password</span><input placeholder="Enter your password again" type="text" name='password' onChange={this.updatestate}/></li>
                        <li><span>Confirm Password</span><input placeholder="Enter your password again" type="text" name='confirmpass' onChange={this.updatestate}/></li>
                        <li><input defaultValue="Submit" type="submit" onClick={this.sendpass}/></li>
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
}

export default Reset;
