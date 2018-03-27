import React, {Component} from 'react';

class Header extends Component{
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
                    
                </div>
                </div>
            </div>
            <div className="header">
                <div className="header_lft">
                <div className="logo"><a href="#"><img src="/images/logo.png" /></a></div>
                
                </div>
                <div className="header_rgt">
                <div className="flag_div"><img src="/images/flag.png" /></div>
                <input placeholder="Search" className="txt_box" type="text" />
                
            </div>
          </div>
        </div>
        )
    }
}

export default Header;