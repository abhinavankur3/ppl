import React, { Component } from 'react';
import { Switch , Route } from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import Forget from './Forget';
import Home from './Home';
import SingalPost from './Singal_post';
import Timeline from './Timeline';
import Footer from './footer';
import Newheader from './newheader';
import Header from './header.jsx';
import Reset from './Reset';
import Rightcon from './right-con.jsx'
import Googlelogin from './googlelogin.jsx';

class App extends Component {

      render() {
      return (
        <div>
          <Route path="/timeline" component={Newheader} />
          <Route path="/login" component={Header} />
          <Route path="/register" component={Header} />
          <Route exact path="/" component={Header} />
          
          <div className="container">
            <div className="content">
              <Route path="/timeline" component={Rightcon} />
          
         <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/login/forget"component={Forget} />
            <Route exact path="/login/:id" component={Login} />
            <Route exact path="/timeline/" component={Timeline} />
            <Route exact path="/timeline/upload" component={Timeline} />
            <Route exact path="/timeline/category" component={Timeline} />
            <Route path="/timeline/single/:_id" component={SingalPost} />
            <Route exact path="/timeline/home/" component={Home} />
            <Route exact path="/timeline/profile"component={Timeline} />
            <Route exact path="/timeline/profilepic"component={Timeline} />
            <Route exact path="/login/reset/:id" component={Reset} />
            <Route exact path="/googlelogin/:emailid" component={Googlelogin} />
          </Switch>
          </div>
          </div>
          <Footer /> 
        </div>
      );
    }
  };

export default App;
