const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");


const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment's _id field
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      type: String,
      required: true,
      trim: true,
    },
    writtenBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
  ); 
  
  
  const CommentSchema = new Schema(
    {
      writtenBy: {
        type: String,
        required: true,
        trim: true,
      },
      commentBody: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      // use ReplySchema to validate data for a reply
      replies: [ReplySchema],
    },
    {
      toJSON: {
        virtuals: true,
        // we'll use getters to transform the data by default every time it's queried.
        getters: true,
      },
      // prevents virtuals from creating duplicate of _id as `id`      
      id: false,
    }
    );
    
    // add a virtual to get the total reply count. Using the Pizza model's commentCount
    CommentSchema.virtual("replyCount").get(function () {
      return this.replies.length;
    });
    
    const Comment = model("Comment", CommentSchema);
    module.exports = Comment;
    


