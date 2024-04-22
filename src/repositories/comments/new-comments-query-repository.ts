import {commentsModel, LikesCommentsModel} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {newCommentMaper} from "../../mapers/newCommentMaper";


export const newCommentsQueryRepository = {

    async findCommentById(id: string, userId: string | null) {

        const comment = await commentsModel.findOne({_id: new ObjectId(id)})

        if (!comment) return null

        const oneDocumentFromLikeColectionByCommentId = await LikesCommentsModel.findOne({commentId: new ObjectId(id)})


        let documentFromLikeCollection = null

        if (oneDocumentFromLikeColectionByCommentId) {
            documentFromLikeCollection = oneDocumentFromLikeColectionByCommentId
        }


            return newCommentMaper(
                comment,
                documentFromLikeCollection,
                userId)

        }
    ,

        /*    async getCommentsForCorrectPost(postId: string, sortData: SortDataGetCoomentsForCorrectPost) {


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


                return {
                    pagesCount,
                    page: pageNumber,
                    pageSize,
                    totalCount,
                    items: comments.map(commentMaper)
                }
            }*/
    }