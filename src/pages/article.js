import { useParams } from "react-router-dom";
import articledata from "./articledata";
import Notfoundpage from "./notfoundpage";
import { useEffect,useState } from "react";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import AddComment from "../components/AddComment";


const Article= () => {
    const {articleID}=useParams();
    const article =  articledata.find(article=>article.id===articleID);

    
    const [articleInfo,setArticleInfo] = useState({likes: 0,comments: []});
    useEffect(()=>{
        const loadarticledata = async () =>{
            const responce = await axios.get(`/api/articles/${articleID}`);
            const newarticledata = responce.data;
            setArticleInfo(newarticledata);
                        
        }  
        loadarticledata();              
    },[articleID]);   
    
    const addLike = async () =>{
        const responce = await axios.put(`/api/articles/${articleID}/like`);
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
        <button onClick={addLike}>likes</button>
        <p>this article has {articleInfo.likes} likes </p>
        <h1>{article.name}</h1>
        <p>{article.description}</p>
        <AddComment articleID={articleID} onArticleChange={onArticleChange=>setArticleInfo(onArticleChange)} />
        <CommentsList comments={articleInfo.comments} />
        
        </>
    
    );
}



export default Article;