import express from "express";

let articledb=[{
    id: "Sample-1",
    likes: 0,
    comments:[],
},{
    id: "Sample-2",
    likes: 0,
    comments:[],
},{
    id: "Sample-3",
    likes: 0,
    comments:[],
},{
    id: "Sample-4",
    likes: 0,
    comments:[],
}]

const app = express();
app.use(express.json());

app.post('/hello',(req,res)=>{
    console.log(req.body);
    res.send(`hello ${req.body.name}`);
});

app.put('/api/articles/:articleID/like',(req,res)=>{
    const {articleID}=req.params;
    const article=articledb.find(a=>articleID===a.id);
    if(article){
        article.likes+=1;
        res.send(`this article has ${article.likes}likes`)
    }
    else{
        res.send('that article doesn\'t exists');
    }
      
})

app.post('/api/articles/:articleID/comment',(req,res)=>{
    const {articleID} = req.params;
    const {postedby,comment} = req.body;
    const article=articledb.find(a=>articleID==a.id);
    
    console.log({article})
    if(article){
       
        article.comments.push({postedby,comment});

        // console.log(article.comments);
        // console.log(article.comments[0].comment);

        res.send(`${postedby} cmt ${comment} for the ${article.id} article`)
        // res.send(article.comments)
    }
    else{
        res.send('article doesn\'t exist');
    }
})

app.listen(8000,()=>{
    console.log('server is listening');
});