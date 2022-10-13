import mongoose from "mongoose";
const Schema=mongoose.Schema;

const NewsSchema= new Schema({
    
    Image:{
        type: String,
        min: 3,
        max: 40,
        unique:true
      },
      title:{
        type: String,
        min: 6,
        max: 20,
    
      },
      subtitle:{
        type: String,
        min: 6,
        max: 50,
    
      },
      author_name:{
        type: String,
        min: 6,
        max: 20,
    
      },
      published_date:{
        type: Date,
    
      },
      description :{
        type: String,
    
      }
});

export default mongoose.model('News', NewsSchema);