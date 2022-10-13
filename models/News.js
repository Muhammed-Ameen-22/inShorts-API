import mongoose from "mongoose";
const Schema=mongoose.Schema;

const NewsSchema= new Schema({
    
    image:{
        type: String,
        min: 3,
        max: 40,
      },
      title:{
        type: String,
        min: 6,
        max: 20,
    
      },
      subTitle:{
        type: String,
        min: 6,
        max: 50,
    
      },
      authorName:{
        type: String,
        min: 6,
        max: 20,
    
      },
      publishedDate:{
        type: Date,
    
      },
      description :{
        type: String,
    
      }
});

export default mongoose.model('News', NewsSchema);