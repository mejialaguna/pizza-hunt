// const { Schema, model, Types } = require("mongoose");
// const dateFormat = require("../utils/dateFormat");


// const ReplySchema = new Schema(
//   {
//     // set custom id to avoid confusion with parent comment's _id field
//     replyId: {
//       type: Schema.Types.ObjectId,
//       default: () => new Types.ObjectId(),
//     },
//     replyBody: {
//       type: String,
//     },
//     writtenBy: {
//       type: String,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: (createdAtVal) => dateFormat(createdAtVal),
//     },
//   },
//   {
//     toJSON: {
//       getters: true,
//     },
//   }
//   ); 
  
  
//   const CommentSchema = new Schema(
//     {
//       writtenBy: {
//         type: String,
//       },
//       commentBody: {
//         type: String,
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now,
//       },
//       // use ReplySchema to validate data for a reply
//       replies: [ReplySchema],
//     },
//     {
//       toJSON: {
//         virtuals: true,
//         // we'll use getters to transform the data by default every time it's queried.
//         getters: true,
//       },
//       // prevents virtuals from creating duplicate of _id as `id`      
//       id: false,
//     }
//     );
    
//     // add a virtual to get the total reply count. Using the Pizza model's commentCount
//     CommentSchema.virtual("replyCount").get(function () {
//       return this.replies.length;
//     });
    
//     const Comment = model("Comment", CommentSchema);
//     module.exports = Comment;
    

    const { Schema, model, Types } = require("mongoose");
    const dateFormat = require("../utils/dateFormat");

    const ReplySchema = new Schema(
      {
        // set custom id to avoid confusion with parent comment _id
        replyId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(),
        },
        replyBody: {
          type: String,
        },
        writtenBy: {
          type: String,
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
        },
        commentBody: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (createdAtVal) => dateFormat(createdAtVal),
        },
        // use ReplySchema to validate data for a reply
        replies: [ReplySchema],
      },
      {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
    );

    CommentSchema.virtual("replyCount").get(function () {
      return this.replies.length;
    });

    const Comment = model("Comment", CommentSchema);

    module.exports = Comment;
