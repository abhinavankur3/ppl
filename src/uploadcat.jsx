import React,{Component} from 'react';
import Dropzone from 'react-dropzone'

class Uploadcat extends Component{
    constructor(props){
        super(props);
        this.state={
            filename:'',
            category:'',
            postedimage:null
        }
        this.updatestate = this.updatestate.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.datasend = this.datasend.bind(this);
    }
    updatestate(e){
        this.setState({[e.target.name]:e.target.value.toUpperCase()})
    }
    handleDrop(acceptedimage, rejectedimage){
      const [{name}] = acceptedimage;
      this.setState({
          filename:name,
          postedimage:acceptedimage[0]
        })

    }
    datasend(e){
        e.preventDefault();
        console.log(this.state);
        let formdata = new FormData();
           
            formdata.append('category',this.state.category);
            formdata.append('filename',this.state.filename);
            formdata.append('postedimage',this.state.postedimage);

            const url = "http://localhost:8080/categories/create";
            let fetchData = {
            method: 'POST', 
            body: formdata
            
            }
            console.log("formData",formdata);
        
            fetch(url,fetchData)
            .then(res => res.json())
            .catch(function(error) {
            console.log("error in catch");
            })
            .then(res => {
                return this.props.update(res)
            });
    }
    render(){
        return(
            <div className="rght_cate_hd">
                <div className='contnt_lft' style={{margin:50}} >
                    <form encType='multipart/form-data' onSubmit={this.datasend}>
                        <Dropzone onDrop={this.handleDrop} style={{width: 70,height: 70,borderWidth: 2,borderColor: 'rgb(102, 102, 102)',borderStyle:'dashed',borderRadius: 3}} name='catimage' >
                        
                        </Dropzone><br/><br/>
                        Category Name <br/>
                        <input type='text' name="category" onChange={this.updatestate}/>
                        <br/><br/>
                        <input type="submit" value='UPLOAD' />
                    </form>
                </div>
            </div>
        )
    }
}

export default Uploadcat;