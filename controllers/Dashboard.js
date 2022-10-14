import News from "../models/News.js";
import ReadHistory from "../models/ReadHistory.js";

export const populateNews = async (req, res) => {
    const userId = req.user.userId;
    try {
        const newsList = await News.find({})

        //checking whether news are available
        if (newsList) {

            //checking whether user has read any news
            const readHist = await ReadHistory.find({ userId: userId })

            if (readHist) {
                //filtering out the unread news
                const unreadList = newsList.filter(news => {
                    return !readHist.find(function (readNews) {
                        return news.id === readNews.newsId
                    })
                })

                const readHistoryArray = []
                readHist.map(news =>
                    readHistoryArray.push(news.newsId))

                //fetching the read news
                const readList = await News.find({
                    _id: {
                        "$in":
                            readHistoryArray
                    }
                })

                if (readList) {
                    readList.sort((a, b) => b.publishedDate - a.publishedDate)
                }

                unreadList.sort((a, b) => b.publishedDate - a.publishedDate)
                return res.status(200).json({ 'Unread': unreadList, 'Read': readList });
            }

            else {
                newsList.sort((a, b) => b.publishedDate - a.publishedDate)
                return res.status(200).json({ 'Unread': newsList });
            }

        }
        else {
            const response = { "Status": "Failure", "Reason": "No news found" }
            return res.status(400).send(response)

        }

    } catch (err) {
        console.log(err)
    }
}


export const readNews = async (req, res) => {

    try {
        const userId = req.user.userId;
        const newsId = req.query.id;
        const readDate = new Date()
        try {
            //checking whether news are available
            const news = await News.findOne({ _id: newsId })
            if (news === undefined) {
                const response = { "Status": "Failure", "Reason": "No news found" }
                return res.status(400).send(response)
            }
            const read = new ReadHistory({ userId: userId, newsId: newsId, readAt: readDate });
            read.save();
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
