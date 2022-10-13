import News from "../models/News.js";


export const populateNews =async(req,res)=>{

    console.log('reached dashboard')
    try {
        

        //check if username already exists in db

        News.find({ }, function (data,err) {
            if (data) {
                
                //News is available
                console.log('res', data)
                return res.status(200).json(data);


            }

            else {
                const response = { "Status": "Failure", "Reason": "No news found" }
                return res.status(400).send(response)

            }

        })
        }catch (error) {
             
    }
}
