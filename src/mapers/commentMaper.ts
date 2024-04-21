
import {OutputComment} from "../allTypes/commentTypes";
import {LikesComments} from "../allTypes/LikesCommentsType";




export const commentMaper = (comment:any):OutputComment => {

        return {
            id:comment._id.toString(),
            content: comment.content,
            createdAt: comment.createdAt,
            commentatorInfo: {
                userId:comment.commentatorInfo.userId,
                userLogin:comment.commentatorInfo.userLogin
            },
        }

}