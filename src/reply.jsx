import React ,{Component} from 'react';

class Reply extends Component{
    render(){
        return(
            <div className="contnt_3">
                <ul>
                <li>
                    <input defaultValue="Reply" className="black_btn" type="button" />
                    <div className="cmnt_div">
                        <input defaultValue="Add a Comment" className="cmnt_bx" type="text" />
                        <input className="sub_bttn" defaultValue="Submit Comment" type="submit" />
                    </div>
                </li>
                </ul>
            </div>
        )
    }
}

export default Reply;