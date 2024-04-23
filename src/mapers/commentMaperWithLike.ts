import {OutputComment} from "../allTypes/commentTypes";
import {LikesCommentsModel} from "../db/mongoDb";
import {LikesComments, StatusLike} from "../allTypes/LikesCommentsType";

export const commentMaperWithLike=async (arrayComentsWithoutLike:OutputComment[],userId:string|null)=>{

    //массив айдишек кометариев
    const arrayIdComments = arrayComentsWithoutLike.map(coment=>coment.id)


/* из базы из колекции лайков достаю только те обьекты у
    которых айдишка коментария имеется в массиве arrayIdComments*/
    const arrayObjectsFromLikeCollection:LikesComments[] = await LikesCommentsModel.aggregate([
        { $match: { commentId: { $in: arrayIdComments } } },
        { $group: { _id: '$commentId', count: { $sum: 1 } } }
    ]);



    const coments = arrayComentsWithoutLike.map((comentWithoutLike:OutputComment)=>{

        const oneObjectFromLikeCollection=arrayObjectsFromLikeCollection.find(e=>e.commentId===comentWithoutLike.id)



        //в  каждом документе (oneObjectFromLikeCollection) из
        // колекции лайков   есть массив (likesInfo)
        // и в массиве найду один обьект по userId чтобы узнать
        //statusLike того кто запрос делает

        const arrayLikesInfo=oneObjectFromLikeCollection!.likesInfo

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
            id: comentWithoutLike.id,
            content: comentWithoutLike.content,
            createdAt: comentWithoutLike.createdAt,
            commentatorInfo:comentWithoutLike.commentatorInfo,
            likesInfo: {
                "likesCount": arrayStatusLike.length,
                "dislikesCount": arrayStatusDislike.length,
                "myStatus": myStatus
            }
        }



    })

    return coments

}