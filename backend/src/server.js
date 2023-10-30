import express from "express";
import { db,connectToDb } from "./db.js";
import admin from "firebase-admin";
import { readFileSync } from "fs"


const credentials =  JSON.parse(
    readFileSync('./credential.json')
);

admin.initializeApp({
    credential : admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());

async function  defuser(req,res,next){
    const {authtoken} = req.headers;
    
    if(authtoken){
        try{
            req.user = await admin.auth().verifyIdToken(authtoken);
                                             
        }
        catch(e){
            return res.status(401).send("unauthorized"); //return
        }
    }
    req.user = req.user || {};
    
    next();
}

app.use(defuser);

app.get('/api/articles/:articleID',async (req,res)=>{
    const {articleID}=req.params;
    
    const {uid} = req.user;
    
    const article = await db.collection('articles').findOne({id:articleID});

    if(article){
        
        const likedIds = article.likedIds || [];
        
        
        article.canUpvote = uid && !likedIds.includes(uid);
        
        
        // const updatedArticle = await db.collection('articles').findOne({id:articleID});
        res.json(article);
        
    }
    else{
        res.status(404).send('this article doesn\'t exist');
    }
    
    
});


app.put('/api/articles/:articleID/like',defuser,async (req,res)=>{
    const {articleID}=req.params;
    const {uid} = req.user;
    
    const article = await db.collection('articles').findOne({id:articleID});
    

    if(article){
        const likedIds = article.likedIds || [];
        
        const canUpvote = uid && !likedIds.includes(uid);
        
        
        if(canUpvote){
            
            await db.collection('articles').updateOne(
                {id: articleID},
                {
                    $inc: {likes: 1},
                    $addToSet: {likedIds : uid},
                },
                { upsert: true} //option for creating afield it it doest exist and prevent duplicate
                )
        }
           
        const updatedArticle = await db.collection('articles').findOne({id:articleID});       
        res.json(updatedArticle);
    }
    else{
        res.status(404).send('that article doesn\'t exists');
    }
    });
        

app.post('/api/articles/:articleID/comment',async (req,res)=>{
    const {articleID} = req.params;
    const {comment} = req.body;
    const {email} = req.user;
    
    await db.collection('articles').updateOne({id:articleID},{
        $push: {comments: {postedby: email,comment}}
    });
    const article = await db.collection('articles').findOne({id:articleID});
        
    if(article){
          
        res.json(article);        
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
