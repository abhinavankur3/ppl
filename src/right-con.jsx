import React,{Component} from 'react';
import { Link, Route } from 'react-router-dom';
import Uploadcat from './uploadcat';
import Upload from './upload';
import Category from './category';


class Rightcon extends Component{
    constructor(props){
        super(props);
        this.state={
            category:[]
        }
        this.rerendercat = this.rerendercat.bind(this);
    }
    rerendercat(obj){
        let newcat = this.state.category;
        newcat.push(obj);
        this.setState({category:newcat});
      }

    componentWillMount(){
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
    render(){
        return(
            
                
                <div className="content_rgt">
                <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <Link to={ `upload`}>Upload Post </ Link> </div>
                <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <Link to={`category`}>Upload Category</Link> </div>
                <div className="rght_cate">
                  
                  <Route path="/timeline/category" render={() => ( <Uploadcat  update={this.rerendercat} />)} />
                  <Route path="/timeline/home/category" render={() => ( <Uploadcat  update={this.rerendercat} />)} />
                 
                  <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                  <Category category={this.state.category} />
                </div>
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                  <div className="sub_dwn">
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="/images/feat_img1.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="/images/feat_img2.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Dogs</div>
                      </div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="/images/feat_img3.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Rabbits</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
        
        )
    }
}

export default Rightcon;