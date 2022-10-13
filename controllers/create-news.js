import News from "../models/News.js";

export const addNews =async(req,res)=>{
    console.log('reached addNews',req)

    const image=req.body.image;
    const title= req.body.title;
    const subTitle = req.body.subTitle;
    const description= req.body.description
    const authorName=req.body.authorName
    const publishedDate = req.body.publishedDate;
    
    try {
    
                //adding news
                const news = new News({ image: image, title:title, subTitle:subTitle , 
                             authorName:authorName,
                             description:description, publishedDate:publishedDate});
                             
                news.save();
                console.log('Entered successfully')
                return res.status(200).send('Successfully entered news')


        }catch (error) {
             
    }
}
