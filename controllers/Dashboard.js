import News from "../models/News.js";
import ReadHistory from "../models/ReadHistory.js";



export const populateNews = async (req, res) => {
    const userId = req.user.userId;

    console.log('reached populateNews')
    try {

        const newsList = await News.find({})

        // console.log("newslist pop",newsList)
        
        const readHist = await ReadHistory.find({userId: userId})
        // console.log("read",readHist)

        const unreadList = newsList.filter(news => {
            // console.log('news first',news)
            // console.log("news",news._id)
            
            return !readHist.find(function(readNews){
                // console.log('readNews functio',readNews)
                return news.id === readNews.newsId
            })
        })
        console.log("Unread list",unreadList.sort((a,b)=>b.publishedDate-a.publishedDate))

        const readList = await ReadHistory.aggregate([{
            $lookup: {
                from: "News", // collection to join
                localField: "newsId",//field from the input documents
                foreignField: "_id",//field from the documents of the "from" collection
                as: "details"// output array field
            }
        },],)

        if(readList)
            console.log('aggregate read List sorted',readList)
        else
            console.log(err,'err')


        const id = "6347fa2777332c467e9a631a"
        console.log("lates",latestList)
        // console.log("NEWS",readhist)
        // .sort('-publishedDate')
        if (news) {
            console.log("read",news[0].readAt)
            //News is available
            // let readNews = []
            for (let i = 0; i < 3; i++) {
                var nid = data[i].id
                console.log('nid', nid)
                var read = ReadHistory.find({ userId: userId, newsId: nid })
                if (read === undefined) {
                    readMess = data[i]
                }
                else
                    unreadMess = unreadMess.push(data[i])
            }




            console.log('read in populate', read._conditions)
            console.log('unread', unreadMess)
            console.log('read message', readMess)

            return res.status(200).json(data);
        }
        else {
            const response = { "Status": "Failure", "Reason": "No news found" }
            return res.status(400).send(response)

        }


    } catch (err) {

    }
}



export const readNews = async (req, res) => {

    console.log('reached read News')

    try {

        console.log("user ID", req.user.userId)
        console.log('params', req.query.id)

        const userId = req.user.userId;
        const newsId = req.query.id;
        const readDate = new Date()
        try {
            const news = await News.findOne({ _id: newsId })
            console.log('news', news)
            if (news === undefined) {

                const response = { "Status": "Failure", "Reason": "No news found" }
                return res.status(400).send(response)
            }

            const read = new ReadHistory({ userId: userId, newsId: newsId, readAt: readDate });
            read.save();
            console.log('Read successfully')
            return res.status(200).send('Successfully read news')

        }
        catch (err) {
            console.log(err)
            const response = { "Status": "Failure" }
            return res.status(400).send(response)
        }

    }

    catch (err) {

    }
}
