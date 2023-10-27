import express from "express";
import { db,connectToDb } from "./db.js";

const app = express();
app.use(express.json());

app.get('/api/articles/:articleID',async (req,res)=>{
    const {articleID}=req.params;
        
    const article = await db.collection('articles').findOne({id:articleID});
    if(article){
        res.json(article);
    }
    else{
        res.status(404).send('this article doesn\'t exist');
    }
    
});

app.post('/hello',(req,res)=>{
    console.log(req.body);
    res.send(`hello ${req.body.name}`);
});

app.put('/api/articles/:articleID/like',async (req,res)=>{
    const {articleID}=req.params;
    
    await db.collection('articles').updateOne({id:articleID},{
        $inc: {likes:1}
    });
        
    const article = await db.collection('articles').findOne({id:articleID});

    //const article=articledb.find(a=>articleID===a.id);
    if(article){
        //article.likes+=1;
        res.send(`${article.id} article has ${article.likes}likes`);
    }
    else{
        res.status(404).send('that article doesn\'t exists');
    }      
})

app.post('/api/articles/:articleID/comment',async (req,res)=>{
    const {articleID} = req.params;
    const {postedby,comment} = req.body;    
    
    await db.collection('articles').updateOne({id:articleID},{
        $push: {comments: {postedby,comment}}
    });
    const article = await db.collection('articles').findOne({id:articleID});
    
    console.log({article})
    if(article){
          
        res.json(article);
        //res.send(`${postedby} commented ${comment} for the ${article.id} article`);       
    }
    else{
        res.status(404).send('article doesn\'t exist');
    }
})
connectToDb(()=>{
    app.listen(8000,()=>{
    console.log('server is listening');
    });
});
