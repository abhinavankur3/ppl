import React, {Component} from 'react';
import Postcontent from './postcontent';
import Comment from './comment';


class SingalPost extends Component{
  constructor(props){
    super(props);
    this.state={
      post:null,
      comment:''
    }
   this.date='';
   this.time='';

   this.updatestate = this.updatestate.bind(this);
   this.sendcomment = this.sendcomment.bind(this);
   this.getpost = this.getpost.bind(this);
  }

  updatestate(e){
    this.setState({comment:e.target.value})
  }

  sendcomment(){
    const url = "http://localhost:8080/upload/comment";

          let fetchData = {
          method: 'POST', 
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _id: this.state.post._id,
            emailid: localStorage.getItem('curremail'),
            comment: this.state.comment
          })
          
          }
          console.log("fetchdata  ",fetchData);
      
          fetch(url,fetchData)
          .then(res => res.json())
          .catch(function(error) {
          console.log("error in catch");
          })
          .then(res => {
            console.log("return response ",res);
           this.setState({post:res[0]})
            });
  }

  getpost(obj){
    const url = "http://localhost:8080/upload/find";

          let fetchData = {
          method: 'POST', 
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(obj.match.params)
          
          }
          console.log("fetchdata  ",fetchData);
      
          fetch(url,fetchData)
          .then(res => res.json())
          .catch(function(error) {
          console.log("error in catch");
          })
          .then(res => {
            console.log("return response ",res);
            this.date = res[0].date.substring(0,16);
           this.time = res[0].date.substring(16,24);
           this.setState({post:res[0]});
           
           console.log(this.state);
            });
  }
  componentWillMount(){
    this.getpost(this.props);
}
componentWillReceiveProps(nextprops){
this.getpost(nextprops);
}

    render() {
      console.log('single post props ',this.props)
      return (
        <div>
          <meta charSet="utf-8" />
          <title>Singal Post</title>
          <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
          <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />

          
              
              <div className="content_lft">
      {this.state.post!==null && <Postcontent totalcomment={this.state.post.comment.length} liked={this.state.post.like} description={this.state.post.description} src={this.state.post.file} name={this.state.post.name} category={this.state.post.category} date={this.date} time={this.time} _id={this.state.post._id}/> }
               
               
                <div className="contnt_3">
                  <ul>
                    {this.state.post!==null && this.state.post.comment.map((comment,i) => {
                      return <Comment name={comment.name} comment={comment.comment}  />
                    })}
                    <li>
                      <div className="cmnt_div1">
                        <input placeholder="Enter your Comment" className="cmnt_bx1" type="text" name='comment' onChange={this.updatestate} />
                        <input className="sub_bttn1" defaultValue="Submit Comment" type="button" onClick={this.sendcomment} />
                      </div>
                    </li>
                  </ul>
                  <div className="view_div"><a href="#">View more</a></div>
                </div>


              </div>
         
            <div className="clear" />
       
          
        </div>
      );
    }
  };

  export default SingalPost;