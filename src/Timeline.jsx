import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import Upload from './upload';
import Postcontent from './postcontent';
import Uploadcat from './uploadcat';
import Category from './category';
import Profile from './profile';

class Timeline extends Component{
  constructor(props){
    super(props);
    this.state = {
      value:[],
      category:[]
    }


    
    this.rerenderpost = this.rerenderpost.bind(this);
  }
    
    rerenderpost(obj){
      let newpost = this.state.value;
      newpost.push(obj);
      this.setState({value:newpost});
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
            body: JSON.stringify(id)
            
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

                <Profile />
                
                <div className="content_lft">
                  
                  {console.log('before send ',this.state.category)}
                  <Route exact path="/timeline/upload" render={() => ( <Upload category={this.state.category}  update={this.rerenderpost}/> )} />
                  
                </div>
                {console.log('timeline props',this.props.location.pathname.split('+')[1])}

                {this.props.location.pathname.indexOf('+')<0?this.state.value.map((post,i) => {
                  let date = post.date.substring(0,16);
                  let time = post.date.substring(16,24);
                 return <Postcontent key={i} totalcomment={post.comment.length} liked={post.like} description={post.description} src={post.file} name={post.name} category={post.category} date={date} time={time} _id={post._id} />
                }).reverse():this.state.value.filter(post => post.category==this.props.location.pathname.split('+')[1].toLowerCase()).map((post,i) =>{
                  console.log('category show');
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

  export default Timeline;