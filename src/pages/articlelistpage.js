import articledata from "./articledata";
import Article from "./articlelist";

const Articlelistpage= () => {
        
    return(
        <>
        <h1>Articles</h1>
        <Article articledata={articledata} />    
        </>        
    );
}

// function data(i){
//     return(
//         <h1>{i.name}</h1>
//     );
// }

export default Articlelistpage;