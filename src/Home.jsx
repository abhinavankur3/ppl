import React, { Component } from 'react';
import Postcontent from './postcontent';
import { Link, Route } from 'react-router-dom';
import Upload from './upload';

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      value:[],
      category:[],
      show:0
      
    }

    this.oldestfirst = this.oldestfirst.bind(this);
    this.latestfirst = this.latestfirst.bind(this);
    this.mostcomment = this.mostcomment.bind(this);
    this.rerenderpost = this.rerenderpost.bind(this);
  }

  rerenderpost(obj){
    let newpost = this.state.value;
    newpost.push(obj);
    this.setState({value:newpost});
  }

  latestfirst(){
    console.log('calling latest first');
    this.setState({show:0});
  }

  oldestfirst(){
    console.log('calling oldest first');    
    this.setState({show:1});
  }

  mostcomment(){
    console.log('calling most comment');
    
    this.setState({show:2})
  }

  componentWillMount(){
    const url = "http://localhost:8080/upload/find";
    let id ={
      emailid:localStorage.getItem('curremail')
    }
          let fetchData = {
          method: 'POST', 
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({})
          
          }
          console.log("fetchdata  ",fetchData);
      
          fetch(url,fetchData)
          .then(res => res.json())
          .catch(function(error) {
          console.log("error in catch");
          })
          .then(res => {
            console.log("return response ",res);
            this.setState({value:res});
            console.log("updated state ",this.state);
            });

            fetch('http://localhost:8080/categories/find',{
              method: 'POST', 
              headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({})
            })
          .then(res => res.json())
          .catch(function(error) {
          console.log("error in catch");
          })
          .then(res => {
            console.log("return response ",res);
            this.setState({category:res});
            console.log("updated state ",this.state);
            });
  }
    render() {
      return (
        <div>
          <meta charSet="utf-8" />
          <title>Home</title>
          <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
          <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
          
         
              
              <div className="content_lft">
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
                  <div className="post_div">
                    <div className="post_list">
                      <ul>
                        <li onClick={this.latestfirst}><span className="list_img"><img src="/images/img_1.png" /></span>Latest First</li>
                        <li onClick={this.oldestfirst}><span className="list_img"><img src="/images/img_2.png" /></span>Oldest First</li>
                        <li><span className="list_img"><img src="/images/img_3.png" /></span>Most Pet</li>
                        <li><span className="list_img"><img src="/images/img_4.png" /></span>Most Clicks</li>
                        <li onClick={this.mostcomment}><span className="list_img"><img src="/images/img_5.png" /></span>Most Commented</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="contnt_1">
                <Route exact path="/timeline/home/upload" render={() => ( <Upload category={this.state.category}  update={this.rerenderpost}/> )} />

                </div>

                {this.state.show===0?this.state.value.map((post,i) => {
                  let date = post.date.substring(0,16);
                  let time = post.date.substring(16,24);
                 return <Postcontent key={i} totalcomment={post.comment.length} liked={post.like} description={post.description} src={post.file} name={post.name} category={post.category} date={date} time={time} _id={post._id} />
                }).reverse() :this.state.show===1?this.state.value.map((post,i) => {
                  let date = post.date.substring(0,16);
                  let time = post.date.substring(16,24);
                 return <Postcontent key={i} totalcomment={post.comment.length} liked={post.like} description={post.description} src={post.file} name={post.name} category={post.category} date={date} time={time} _id={post._id} />
                }): this.state.value.sort((a,b)=>b.comment.length-a.comment.length).map((post,i) => {
                  let date = post.date.substring(0,16);
                  let time = post.date.substring(16,24);
                 return <Postcontent key={i} totalcomment={post.comment.length} liked={post.like} description={post.description} src={post.file} name={post.name} category={post.category} date={date} time={time} _id={post._id} />
                })
                }
              </div>
         
            <div className="clear" />
        
          
        </div>
      );
    }
  };

  export default Home;