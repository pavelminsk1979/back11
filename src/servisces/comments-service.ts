import {commentsRepository} from "../repositories/comments/comments-repository";
import {LikesComments, StatusLike} from "../allTypes/LikesCommentsType";
import {LikesCommentsRepository} from "../repositories/LikesCommentsRepository";



export const commentsSevrice = {

    async deleteComentById(idComent:string){

        return  commentsRepository.deleteComentById(idComent)

    },


    async updateComment(commentId:string,content:string){
        return commentsRepository.updateComment(commentId,content)
    },


    async setOrUpdateLikeStatus(commentId:string,statusLike:StatusLike,userId:string){

        const entityForCollectionLikesComments:LikesComments={
            commentId,
            likesInfo:[
                {userId,statusLike}
            ]
        }//cоздание целой сущности в базе в коллекции likes_comments


        //по айдишке коментария нахожу в колекции likes_comments одну сущность
            //const oneEntityByCommentId


        return LikesCommentsRepository.setEntityForCollectionLikesComments(entityForCollectionLikesComments)
    },
}