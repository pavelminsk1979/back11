
import {NewOutputComment} from "../allTypes/commentTypes";
import {LikesComments, StatusLike} from "../allTypes/LikesCommentsType";



export const newCommentMaper = (comment:any,entityLikesInfo:LikesComments|null):NewOutputComment => {

const userId=comment.commentatorInfo.userId

    if(!entityLikesInfo){
        return {
            id:comment._id.toString(),
            content: comment.content,
            createdAt: comment.createdAt,
            commentatorInfo: {
                userId,
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

    //из массива likesInfo найду один обьект по userId
    const objectFromLikesInfo = entityLikesInfo.likesInfo.find(e=>e.userId===userId)


    const myStatus=objectFromLikesInfo!.statusLike

        //из массива likesInfo найду все обьекты
    // у которых statusLike.Like

    const arrayWithStatusLikeLike=entityLikesInfo.likesInfo.filter(e=>e.statusLike===StatusLike.Like)

    const arrayWithStatusLikeDislike=entityLikesInfo.likesInfo.filter(e=>e.statusLike===StatusLike.Dislike)

    return {
        id:comment._id.toString(),
        content: comment.content,
        createdAt: comment.createdAt,
        commentatorInfo: {
            userId,
            userLogin:comment.commentatorInfo.userLogin
        },
        likesInfo:{
            "likesCount": arrayWithStatusLikeLike.length,
            "dislikesCount": arrayWithStatusLikeDislike.length,
            "myStatus": myStatus
        }
    }

}


