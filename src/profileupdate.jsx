import React, {Component} from 'react';

class Profileupdate extends Component{
    constructor(props){
        super(props);
        this.state={
            emailid: localStorage.getItem('curremail'),
            fname: this.props.user.fname,
            lname: this.props.user.lname,
            sex: this.props.user.sex,
            description:'',
        }
        

        this.updatestate = this.updatestate.bind(this);
        this.onsend = this.onsend.bind(this);
        
    }
    updatestate(e){
        let name = e.target.name;
        this.setState({[name]:e.target.value});
        console.log(this.state);
    }
    
    onsend(e){
        e.preventDefault();
        
            console.log("sending state ",this.state);
            const url = "http://localhost:8080/userupdate";
            let fetchData = {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
              },
            body: JSON.stringify(this.state)
            
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
                    <form onSubmit={this.onsend} >
                        First Name <br/>
                        <input type='text' defaultValue={this.props.user.fname} name="fname" onChange={this.updatestate}/>
                        <br/>
                        Last Name <br/>
                        <input type='text' defaultValue={this.props.user.lname} name="lname" onChange={this.updatestate}/>
                        <br/>
                        Sex <br/>
                        <select name="sex" defaultValue={this.props.user.sex} onChange={this.updatestate} style={{backgroundColor:'black', color:'white'}}>
                            
                            <option value="male">MALE</option>
                            <option value="female">FEMALE</option>
                        </select><br/>
                        Description <br/>
                        <textarea name="description" onChange={this.updatestate} placeholder="Something about yourself" style={{height:150,width:400}}/>
                        <br/><br/>
                        <input style={{backgroundColor:'#F68312'}} type="submit" value='UPLOAD' />
                    </form>
                </div>
            </div>
        )
    }
}

export default Profileupdate;