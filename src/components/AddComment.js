import axios from "axios";
import { useState } from "react"

const AddComment = ({articleID,onArticleChange}) =>{
    const [name,setName] = useState("");
    const [commentText,setCommentText] = useState("");

    const addCommentText = async () =>{
        const responce = await axios.post(`/api/articles/${articleID}/comment`,{
            postedby: name,
            comment: commentText,
        });
        const newarticledata=responce.data;
        onArticleChange(newarticledata);
        setName('');
        setCommentText('');
        
    }
    return(
        <div className="commentbox">
            
            <label>
                name:
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            </label><br />
            <label>
                comment:
                <textarea rows={4} cols={50} value={commentText} onChange={e=> setCommentText(e.target.value)} />
            </label><br />
            <button onClick={addCommentText} >add comment</button>
            
        </div>
    )

}
export default AddComment;    

