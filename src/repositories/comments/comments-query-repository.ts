import {commentsModel, LikesCommentsModel} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {commentMaper} from "../../mapers/commentMaper";
import {SortDataGetCoomentsForCorrectPost} from "../../allTypes/commentTypes";
import {newCommentMaper} from "../../mapers/newCommentMaper";




export const commentsQueryRepository = {

    async findCommentById(id: string,userId:string) {

        const comment = await commentsModel.findOne({_id: new ObjectId(id)})

        if(!comment) return null

        const oneEntityLikeCommentByCommentId=await  LikesCommentsModel.findOne({commentId: new ObjectId(id)})

        let likesInfo=null

        if(oneEntityLikeCommentByCommentId){
            likesInfo=oneEntityLikeCommentByCommentId
        }

        return newCommentMaper(comment,likesInfo,userId)

    },

    async getCommentsForCorrectPost(postId:string,sortData:SortDataGetCoomentsForCorrectPost){


        const {sortBy, sortDirection, pageNumber, pageSize} = sortData


        const sortDirectionValue = sortDirection === 'asc' ? 1 : -1;

        const comments = await commentsModel
            .find({postId})
            .sort({ [sortBy]: sortDirectionValue } )
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
    }
}