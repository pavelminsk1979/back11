import {LikesComments} from "../allTypes/LikesCommentsType";
import {LikesCommentsModel} from "../db/mongoDb";


export const LikesCommentsRepository={
    async setEntityForCollectionLikesComments(entityForCollectionLikesComments:LikesComments){

        const result = await LikesCommentsModel.create(entityForCollectionLikesComments)

        return result

    }
}