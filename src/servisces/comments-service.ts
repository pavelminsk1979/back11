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



        //cоздание  сущности для  коллекции likes_comments
        const newDocumentForCollectionLikesComments: LikesComments = {
            commentId,
            likesInfo: [
                {userId, statusLike}
            ]
        }

        //по айдишке коментария нахожу в колекции likes_comments одну сущность
        const documentLikeCommentByCommentId = await LikesCommentsRepository.findEntityByCommenId(commentId)


        //Если  нету такого документа тогда помещаю в базу //вновьсозданный,
        if (!documentLikeCommentByCommentId) {
            return LikesCommentsRepository.setEntityForCollectionLikesComments(newDocumentForCollectionLikesComments)
        }

        /*   А если document в базе есть есть
           тогда ---У него есть массив likesInfo с данными о лайках , и в
           массиве ищу обьект по userId---*/
        const oneObjectByUserId = await LikesCommentsRepository.findEntityByUserId(userId)

        /*Если oneObjectByUserId есть тогда надо изменить
        statusLike на приходящий */
        if (oneObjectByUserId) {
            return LikesCommentsRepository.setNewStatusLike(userId, statusLike)
        }

        /*Если oneObjectByUserId  нет тогда надо добавить
        вот такой обьект {userId,statusLike}  в массив likesInfo */
        const newObjectForLikesInfo = {userId, statusLike}
        if (!oneObjectByUserId) {
            return LikesCommentsRepository.addNewObjectForLikesInfo(newObjectForLikesInfo, commentId)
        }

        return true

    },
}