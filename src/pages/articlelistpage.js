import articledata from "./articledata";
import ArticleList from "./articlelist";

const Articlelistpage= () => {
        
    return(
        <>
        <h1>Articles</h1>
        <ArticleList articledata={articledata} />    
        </>        
    );
}

// function data(i){
//     return(
//         <h1>{i.name}</h1>
//     );
// }

export default Articlelistpage;