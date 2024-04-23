import {commentsModel, LikesCommentsModel} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {commentMaper} from "../../mapers/commentMaper";
import {OutputComment, SortDataGetCoomentsForCorrectPost} from "../../allTypes/commentTypes";
import {commentMaperWithoutLike} from "../../mapers/commentMaperWithoutLike";
import {commentMaperWithLike} from "../../mapers/commentMaperWithLike";




export const commentsQueryRepository = {

    async findCommentById(id: string) {

        const comment = await commentsModel.findOne({_id: new ObjectId(id)})

        if (!comment) return null

        const oneEntityLikeCommentByCommentId = await LikesCommentsModel.findOne({commentId: new ObjectId(id)})

        let likesInfo = null

        if (oneEntityLikeCommentByCommentId) {
            likesInfo = oneEntityLikeCommentByCommentId
        }

        return commentMaper(comment)

    },

    async getCommentsForCorrectPost(postId: string, sortData: SortDataGetCoomentsForCorrectPost,userId:string|null) {


        const {sortBy, sortDirection, pageNumber, pageSize} = sortData


        const sortDirectionValue = sortDirection === 'asc' ? 1 : -1;

        const comments = await commentsModel
            .find({postId})
            .sort({[sortBy]: sortDirectionValue})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .exec()

        const totalCount = await commentsModel.countDocuments({postId})

        const pagesCount = Math.ceil(totalCount / pageSize)

          //Сперва структура без информации об Лайках
        const arrayComentsWithoutLike:OutputComment[] = commentMaperWithoutLike(comments)

            // массив со всеми свойствами согласно SWAGER
        const arrayComments = commentMaperWithLike(arrayComentsWithoutLike,userId)

        return {
            pagesCount,
            page: pageNumber,
            pageSize,
            totalCount,
            items: arrayComments
        }

     /*   return {
            pagesCount,
            page: pageNumber,
            pageSize,
            totalCount,
            items: comments.map(commentMaper)
        }*/
    }
}