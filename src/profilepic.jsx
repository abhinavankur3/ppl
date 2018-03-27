import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class Profilepic extends Component{
    constructor(props){
        super(props);
        this.state={
            emailid:localStorage.getItem('curremail'),
            postedimage:null,
        }

        this.onsend = this.onsend.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        
    }
    
    handleDrop(acceptedfiles){
      
        this.setState({postedimage:acceptedfiles[0]});
        console.log(this.state);

    }
    
    onsend(e){
        e.preventDefault();
        
            console.log("sending state ",this.state);
            const url = "http://localhost:8080/profilepic";
            let formdata = new FormData();
            formdata.append('emailid',this.state.emailid);
            formdata.append('postedimage',this.state.postedimage)

            let fetchData = {
            method: 'POST', 
            body: formdata
            
            }
            
        
            fetch(url,fetchData)
            .then(res => res.json())
            .catch(function(error) {
            console.log("error in catch");
            })
            .then(res => {
                console.log("profile updated return response ",res);
                this.props.rerender(res[0]);
            });
        
    }

    render(){
        return(
            <div className='container'>
                <div className='contnt_lft' style={{margin:50}} >
                    <form encType='multipart/form-data'id='profileform' onSubmit={this.onsend} >
                    <Dropzone onDrop={ this.handleDrop } name='profileimage' >
                        {this.state.postedimage===null?'':<img src={this.state.postedimage.preview} />}
                        </Dropzone><br/><br/>
                        <input type="submit" value='Upload Pic'/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Profilepic;