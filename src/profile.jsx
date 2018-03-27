import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import Profileupdate from './profileupdate';
import Profilepic from './profilepic';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            user:{},
          
        }
        this.rerender = this.rerender.bind(this);
    }

    rerender(obj){
        this.setState({user:obj});
    }

    componentWillMount(){
        const url = "http://localhost:8080/profile";
        let fetchData = {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
        body: JSON.stringify({emailid:localStorage.getItem('curremail')})
        
        }
        
    
        fetch(url,fetchData)
        .then(res => res.json())
        .catch(function(error) {
        console.log("error in catch");
        })
        .then(res => {
            console.log("profile return response ",res);
            this.setState({user:res[0]});
            console.log('profile set state',this.state)
        });
    }
    render(){
        return(
            <div className="contnt_1">
            <div className="list_1">
              <ul>
                <li>
                  <input className="chk_bx" type="checkbox" />
                  Friends</li>
                <li>
                  <input className="chk_bx" type="checkbox" />
                  Flaged</li>
              </ul>
            </div>
            <div className="timeline_div">
              <div className="timeline_div1">
                <div className="profile_pic">
                  <img src={`http://localhost:8080/${this.state.user.profilepic}`} />
                  <div className="profile_text"><Link to='/timeline/profilepic'><a>Change Profile Pic</a></Link></div>
                </div>
                <div className="profile_info">
                  <div className="edit_div"><a>Edit <Link to='/timeline/profile'><img src="/images/timeline_img.png" /></Link></a></div>
                  <div className="profile_form">
                    <ul>
                      <li>
                        <div className="div_name1">Name :</div>
                        <div className="div_name2">{this.state.user.fname} {this.state.user.lname}</div>
                      </li>
                      <li>
                        <div className="div_name1">Sex :</div>
                        <div className="div_name2">{this.state.user.sex}</div>
                      </li>
                      <li>
                        <div className="div_name1">Description :</div>
                        <div className="div_name3">{this.state.user.description}</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="timeline_div2">
                <ul>
                  <li><a href="#" className="active">Timeline    </a></li>
                  <li><a href="#">About  </a></li>
                  <li><a href="#">Album</a></li>
                  <li><a href="#"> Pets</a></li>
                  <li><a href="#">My Uploads </a></li>
                </ul>
              </div>
            </div>
            <div className="timeline_div">
                <Route exact path='/timeline/profile' render={() => <Profileupdate rerender={this.rerender} user={this.state.user}/>} />
                <Route exact path='/timeline/profilepic' render={() => <Profilepic rerender={this.rerender}/>} />
            </div>
          </div>
          
        )
    }
}

export default Profile;