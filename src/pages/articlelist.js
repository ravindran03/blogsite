import { Link } from "react-router-dom"

const Article =({articledata})=>{
    return(
        <>
        {articledata.map(data => (
                    
            <Link key={data.id} to={`/articles/${data.id}`} >
                <h2>{data.name}</h2>
                <p>{data.description.substring(0,17)}... </p>
            </Link>                
            

        ))}
        </>
    )
}
export default Article;