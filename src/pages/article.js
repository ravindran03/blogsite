import { Link, useParams } from "react-router-dom";
import articledata from "./articledata";
import Notfoundpage from "./notfoundpage";
import { useEffect,useState } from "react";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import AddComment from "../components/AddComment";
import useUser from "../hooks/useUser";

const Article = () => {
    const {articleID}=useParams();
    const article =  articledata.find(article=>article.id===articleID);
    const {user,isLoading}=useUser();
    
    const [articleInfo,setArticleInfo] = useState({likes: 0,comments: [],canUpvote: false});
    const {canUpvote} = articleInfo
    useEffect(()=>{
        const loadarticledata = async () =>{
            const token = user && await user.getIdToken();
            const headers = token ? {authtoken: token } :{};
            
            const responce = await axios.get(`/api/articles/${articleID}`,{headers});
            const newarticledata = responce.data;
            setArticleInfo(newarticledata);
                        
        }
        if(!isLoading){
            loadarticledata();
        }  
                      
    },[user,isLoading]);   
    
    const addLike = async () =>{
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token } :{};
        
        const responce = await axios.put(`/api/articles/${articleID}/like`,null,{headers});
        const newarticledata = responce.data;
        setArticleInfo(newarticledata);
    }
    
    

    if(!article){
        return(
            <Notfoundpage />
        )
    }

    return (
        <>
        {user?
        <button onClick={addLike}>{canUpvote ? `like`: `liked`}</button>
        :<Link to={'/login'}><button>Login to like</button></Link>}
        <p>this article has {articleInfo.likes} likes </p>
        <h1>{article.name}</h1>
        <p>{article.description}</p>
        {user?
        <AddComment articleID={articleID} onArticleChange={onArticleChange=>setArticleInfo(onArticleChange)} />
        :<Link to={'/login'}><button>Login to comment</button></Link>}
        <CommentsList comments={articleInfo.comments} />
        
        </>
    
    );
}



export default Article;