import React ,{Component} from 'react';
import {Link} from 'react-router-dom';

class Category extends Component{
  constructor(props){
    super(props);

  }
  fetchcat(e){
    fetch('http://localhost:8080/',{
                method: 'POST', 
                headers: {
                  'Content-type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({category:e.target.value})
              })
            .then(res => res.json())
            .catch(function(error) {
            console.log("error in catch");
            })
            .then(res => {
              console.log("return response ",res);
              //this.setState({category:res});
              //console.log("updated state ",this.state);
              });
  }
    render(){
        return(
                  <div className="rght_list">
                    <ul>
                      {this.props.category.map((cat,i) => {
                        return <li key={i} ><a>
                         <Link to={`+${cat.category}`}> <button value={cat.category} style={{border:'none',width:'100%',background:'#f1f1f1',textAlign:'left',color:'black'}}>
                          <span className="list_icon">
                          <img style={{width:30,height:30}} src={`http://localhost:8080/${cat.filename}`} alt="up" />
                          </span>
                          {cat.category}
                          </button></Link>
                          </a>
                          </li>
                      })}
                    </ul>
                    </div>
        )
    }
}

export default Category;

