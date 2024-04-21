
import {OutputComment} from "../allTypes/commentTypes";
import {LikesComments} from "../allTypes/LikesCommentsType";




export const commentMaper = (comment:any,likesInfo:LikesComments):OutputComment => {
    if(!likesInfo){
        return {
            id:comment._id.toString(),
            content: comment.content,
            createdAt: comment.createdAt,
            commentatorInfo: {
                userId:comment.commentatorInfo.userId,
                userLogin:comment.commentatorInfo.userLogin
            },
            likesInfo:{
                "likesCount": 0,
                "dislikesCount": 0,
                "myStatus": "None"
            }
            //commentatorInfo:comment.commentatorInfo
        }
    }
    return true

}