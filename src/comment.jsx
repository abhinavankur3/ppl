import React ,{Component} from 'react';

class Comment extends Component{
    render(){
        return(
            <li>
                <div className="list_image">
                    <div className="image_sec"><img src="/images/post_img.png" /></div>
                    <div className="image_name">{this.props.name}</div>
                </div>
                <div className="list_info">
                    {this.props.comment}
                </div>
                 <input defaultValue="Reply" className="orng_btn" type="button" />
             </li>
        )
    }
}

export default Comment;