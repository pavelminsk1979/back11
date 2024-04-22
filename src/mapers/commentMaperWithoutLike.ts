
import {Comment, OutputComment} from "../allTypes/commentTypes";
import {LikesComments} from "../allTypes/LikesCommentsType";







export const commentMaperWithoutLike=(comments:any)=>{

    const newArrayComents = comments.map((oneComent:any):OutputComment=>{
        return{
            id:oneComent._id.toString(),
            content: oneComent.content,
            createdAt: oneComent.createdAt,
            commentatorInfo: {
                userId:oneComent.commentatorInfo.userId,
                userLogin:oneComent.commentatorInfo.userLogin
            }
        }
    })
    return newArrayComents

}





