import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';

class Postcontent extends Component{

  constructor(props){
    super(props);
    this.state={
      like:false
    }
   
   this.likedislike = this.likedislike.bind(this);
  }
  componentWillMount(){
    if(this.props.liked.includes(localStorage.getItem('curremail'))){
      this.setState({like:true})
    }
  }
  likedislike(){
    
    this.setState({like:!this.state.like})

    if(!this.state.like){

      const url = "http://localhost:8080/upload/update";

          let bdy={
            email:localStorage.getItem('curremail'),
            _id:this.props._id
          }

          let fetchData = {
          method: 'POST', 
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(bdy)
          
          }
          console.log("fetchdata  ",fetchData);
      
          fetch(url,fetchData)
          .then(res => res.json())
          .catch(function(error) {
          console.log("error in catch");
          })
          .then(res => {
            console.log("return response ",res);
            
         });

    }
    else{
      const url = "http://localhost:8080/upload/reupdate";

          let bdy={
            email:localStorage.getItem('curremail'),
            _id:this.props._id
          }

          let fetchData = {
          method: 'POST', 
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(bdy)
          
          }
          console.log("fetchdata  ",fetchData);
      
          fetch(url,fetchData)
          .then(res => res.json())
          .catch(function(error) {
          console.log("error in catch");
          })
          .then(res => {
            console.log("return response ",res);
          
         });

    }
    
  }
  
  render(){
    console.log('postcontent props',this.props)
    
        return(
            <div className="contnt_2">
                  <div className="div_a">
                    <div className="div_title">{this.props.description}</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">{this.props.category}</div>
                    </div>
                    <div className="div_top">
                      <div className="div_top_lft"><img src="/images/img_6.png" />{this.props.name}</div>
                      <div className="div_top_rgt"><span className="span_date">{this.props.date}</span><span className="span_time">{this.props.time}</span></div>
                    </div>
                    <div className="div_image"><Link to={`/timeline/single/${this.props._id}`}><img src={`http://localhost:8080/${this.props.src}`} alt="pet" /></Link></div>
                    <div className="div_btm">
                      <div className="btm_list">
                        <ul>
                          <li><a href="#"><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                          <li><a href="#"><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                          <li><a onClick={this.likedislike}><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>{!this.state.like?"Like":"Unlike"}</a></li>
                          <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>{this.props.totalcomment} Comments</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
            </div>
        )
    }
}
export default Postcontent;