import { useParams } from "react-router-dom";
import articledata from "./articledata";
import Notfoundpage from "./notfoundpage";

const Article= () => {
    const {articleID}=useParams();
    const article =  articledata.find(article=>article.id===articleID)

    if(!article){
        return(
            <Notfoundpage />
        )
    }

    return (
        <>
        <h1>{article.name}</h1>
        <p>{article.description}</p>
        </>
    
    );
}



export default Article;