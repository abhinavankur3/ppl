import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Newheader extends Component{

    constructor(props){
        super(props);

        this.state={
          search:'',
          result:[]
        }
        this.flag=true;
        this.interval=null;

        this.removeval = this.removeval.bind(this);
        this.updatestate = this.updatestate.bind(this);
        this.fetchdata = this.fetchdata.bind(this); 
        this.setflag = this.setflag.bind(this);   
      }

    updatestate(e){
      this.setState({search:e.target.value})
      console.log('updated state');
      if(this.flag){
        this.interval = setInterval(this.fetchdata,3000);
        this.flag = false;
      }
  
    }

    setflag(){
      clearInterval(this.interval);
      this.flag = true;
      console.log('outfocus');
    }

    fetchdata(){
      console.log(`${this.state.search.split('').join('.*')}`);
      let pattern = `${this.state.search.split('').join('.*')}`;

      fetch('http://localhost:8080/upload/search',{
        method:'POST',
        body:JSON.stringify({pattern}),
        headers:{
          "Accept":"application/json",
          "Content-type":"application/json"
        }
      })
      .then(res => res.json())
      .catch(error => {console.log('error in search fetch')})
      .then(res => {
        console.log('response of search fetch',res);
        this.setState({result:res});
      });
    }

    removeval(){
        localStorage.removeItem('emailid');
        localStorage.removeItem('curremail');
        this.props.history.push('/login');
      }

    render(){
        return(
            <div>
                <div className="navbar navbar-inverse navbar-fixed-top">
            <div className="navbar-inner">
              <div className="container">
                <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
                <a className="brand" href>PPL</a>
                <div className="pro_info pull-right">
                  <div className="pro_icn"><img src="/images/pic_small.png" /></div>
                  <div className="pro_txt">Me<b className="caret" /></div>
                  <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                    <li><a tabIndex={-1} href="#">My Profile</a></li>
                    <li><a tabIndex={-1} href="#">Message Box</a></li>
                    <li><a tabIndex={-1} href="#">Change Language</a></li>
                    <li className="divider" />
                    <li><a tabIndex={-1} href="#">
                        <input placeholder="search" type="text" />
                      </a></li>
                  </ul>
                </div>
                <div className="nav-collapse collapse">
                  <ul className="nav">
                    <li className="active"> <a href>Home</a> </li>
                    <li className> <a href>E-Coupons</a> </li>
                    <li className> <a href>E-Brands</a> </li>
                    <li className> <a href>Resuse Market</a> </li>
                    <li className> <a href>Lost and Found</a> </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="header">
            <div className="header_lft">
              <div className="logo"><a href="#"><img src="/images/logo.png" /></a></div>
              <div className="navigatn">
                <ul>
                  <li><Link to='/timeline/home/'><a className="active">Home</a></Link></li>
                  <li><a href="#"> E-Coupons </a></li>
                  <li><a href="#">E-Brands </a></li>
                  <li><a href="#"> Resuse Market </a></li>
                  <li><a href="#"> Lost and Found</a></li>
                </ul>
              </div>
            </div>
            <div className="header_rgt">
              <div className="flag_div"><img src="/images/flag.png" /></div>
              <div className="dropresult-container">
              <input placeholder="Search" onChange={this.updatestate} onBlur={this.setflag} className="txt_box" type="text" />
             
                <ul className="dropresult">
                  {this.state.result.length!==0?this.state.result.map( des => <Link to={`/timeline/single/${des._id}`}><li>{des.description}</li></Link>):<li>NO RESULT</li>}
                </ul>
              </div>
              <div className="msg_box"><a href="#"><span className="msg_count">100</span></a></div>
              <div className="info_div">
                
                <div className="pro_info pull-right">
                  <div className="pro_icn"><img src="/images/pic_small.png" /></div>
                  <div className="pro_txt">Me<b className="caret" /></div>
                  <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                  <li><Link to='/timeline/'>My Profile</Link></li>
                    <li><a tabIndex={-1} onClick={this.removeval}>LOGOUT</a></li>
                    <li className="divider" />
                  </ul>
                </div>
              </div>
            </div>
          </div>
            </div>
        )
    }
}

export default Newheader;