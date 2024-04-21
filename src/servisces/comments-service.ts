import {commentsRepository} from "../repositories/comments/comments-repository";
import {LikesComments, StatusLike} from "../allTypes/LikesCommentsType";
import {LikesCommentsRepository} from "../repositories/LikesCommentsRepository";


export const commentsSevrice = {

    async deleteComentById(idComent: string) {

        return commentsRepository.deleteComentById(idComent)

    },


    async updateComment(commentId: string, content: string) {
        return commentsRepository.updateComment(commentId, content)
    },


    async setOrUpdateLikeStatus(commentId: string, statusLike: StatusLike, userId: string) {

        const entityForCollectionLikesComments: LikesComments = {
            commentId,
            likesInfo: [
                {userId, statusLike}
            ]
        }//cоздание целой сущности для  коллекции likes_comments


        //по айдишке коментария нахожу в колекции likes_comments одну сущность
        const oneEntityLikeCommentByCommentId = await LikesCommentsRepository.findEntityByCommenId(commentId)

        //Если oneEntityLikeCommentByCommentId нету тогда помещаю в базу //вновьсозданую,
        if (!oneEntityLikeCommentByCommentId) {
            return LikesCommentsRepository.setEntityForCollectionLikesComments(entityForCollectionLikesComments)
        }

        /*   А если oneEntityLikeCommentByCommentId в базе есть есть
           тогда ---У сущности есть массив likesInfo с данными о лайках , и в
           массиве ищу обьект по userId---*/
        const oneEntityFromLikesInfoByUserId = await LikesCommentsRepository.findEntityByUserId(userId)

        /*Если oneEntityFromLikesInfoByUserId есть тогда надо изменить
        statusLike на приходящий */
        if (oneEntityFromLikesInfoByUserId) {
            return LikesCommentsRepository.setNewStatusLike(userId, statusLike)
        }

        /*Если oneEntityFromLikesInfoByUserId нет тогда надо добавить
        вот такой обьект {userId,statusLike}  в массив likesInfo */
        const newObjectForLikesInfo = {userId, statusLike}
        if (!oneEntityFromLikesInfoByUserId) {
            return LikesCommentsRepository.addNewObjectForLikesInfo(newObjectForLikesInfo, commentId)
        }

        return true

    },
}