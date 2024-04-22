import {NewOutputComment} from "../allTypes/commentTypes";
import {LikesComments, StatusLike} from "../allTypes/LikesCommentsType";


export const newCommentMaper = (
    comment: any,
    documentFromLikeCollection: LikesComments | null,
    userId: string | null): NewOutputComment => {


    if (!documentFromLikeCollection) {
        return {
            id: comment._id.toString(),
            content: comment.content,
            createdAt: comment.createdAt,
            commentatorInfo: {
                userId: comment.commentatorInfo.userId,
                userLogin: comment.commentatorInfo.userLogin
            },
            likesInfo: {
                "likesCount": 0,
                "dislikesCount": 0,
                "myStatus": "None"
            }
        }
    }




    const arrayLikesInfo=documentFromLikeCollection.likesInfo

    //в  documentFromLikeCollection  есть массив (likesInfo)
    // и в массиве найду один обьект по userId чтобы узнать
    //statusLike того кто запрос делает

    let myStatus


    const oneObjectFromLikesInfoByUserId = arrayLikesInfo.find(e => e.userId === userId)


        myStatus = oneObjectFromLikesInfoByUserId
            ? oneObjectFromLikesInfoByUserId.statusLike
            : 'None'



    //из массива arrayLikesInfo найду все обьекты
    // у которых statusLike.Like

    const arrayStatusLike = arrayLikesInfo.filter(e => e.statusLike === StatusLike.Like)

    const arrayStatusDislike = arrayLikesInfo.filter(e => e.statusLike === StatusLike.Dislike)

    return {
        id: comment._id.toString(),
        content: comment.content,
        createdAt: comment.createdAt,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin
        },
        likesInfo: {
            "likesCount": arrayStatusLike.length,
            "dislikesCount": arrayStatusDislike.length,
            "myStatus": myStatus
        }
    }

}


