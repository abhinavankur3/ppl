import React, {Component} from 'react';
import Dropzone from 'react-dropzone'

class Upload extends Component{
    constructor(props){
        super(props);
        this.state={
            emailid: localStorage.getItem('curremail'),
            postinfo: {
                description: '',
                category: 'other',
                file: '',
                postedimage: null
            },
        }
        console.log('uploads props ',this.props.value);
        this.updatestate = this.updatestate.bind(this);
        this.onsend = this.onsend.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }
    updatestate(e){
        let name = e.target.name;
        let p = this.state.postinfo;
        p[name] = e.target.value;
        this.setState({postinfo:p});
        console.log(this.state);
    }
    handleDrop(acceptedfiles,rejectedfiles){
        
        let p = this.state.postinfo;
        p.file = acceptedfiles[0].name;
        p.postedimage = acceptedfiles[0];
        this.setState({postinfo:p});
        console.log(this.state);

    }
    onsend(e){
        e.preventDefault();
        
            console.log("state",this.state);
            let formdata = new FormData();
            formdata.append('emailid',this.state.emailid);
            formdata.append('description',this.state.postinfo.description);
            formdata.append('category',this.state.postinfo.category);
            formdata.append('file',this.state.postinfo.file);
            formdata.append('postedimage',this.state.postinfo.postedimage);

            const url = "http://localhost:8080/upload";
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
            <div className='container'>
                <div className='contnt_lft' style={{margin:50}} >
                    <form encType='multipart/form-data'id='postform' onSubmit={this.onsend}>
                        <Dropzone onDrop={ this.handleDrop } name='image' >
                        {this.state.postinfo.postedimage===null?'':<img src={this.state.postinfo.postedimage.preview} />}
                        </Dropzone><br/><br/>
                        Category <br/>
                        <select name='category' onChange={this.updatestate} style={{backgroundColor:'black', color:'white'}}>
                           {console.log("props in upload ",this.props.category)}
                            {this.props.category.map((cat,i) => {
                              return  <option key={i} value={cat.category}>{cat.category}</option>
                                })
                            }      
                        </select> <br/><br/>
                        Description <br/>
                        <textarea name="description" onChange={this.updatestate} placeholder="Description about the picture" style={{height:150,width:500}}/>
                        <br/><br/>
    <input style={{backgroundColor:'#F68312'}} type="submit" value='UPLOAD' />
                    </form>
                </div>
            </div>
        )
    }
}

export default Upload;