import {LikesComments, StatusLike} from "../allTypes/LikesCommentsType";
import {LikesCommentsModel, postssModel} from "../db/mongoDb";
import {ObjectId} from "mongodb";


export const LikesCommentsRepository = {

    async setEntityForCollectionLikesComments(entityForCollectionLikesComments: LikesComments) {

        return LikesCommentsModel.create(entityForCollectionLikesComments)

    },

    async findEntityByCommenId(commentId: string) {

        return LikesCommentsModel.findOne({commentId: new ObjectId(commentId)})

    },

    async findEntityByUserId(userId: string) {

        return LikesCommentsModel.findOne({
            likesInfo: {$elemMatch: {userId}}
        })
        /* $elemMatch  проверяет, есть ли в массиве likesInfo объект
         с указанным userId. Если найден соответствующий объект, он будет возвращен в entity. Если ни один объект не будет найден,возвращено будет значение null*/

    },

    async setNewStatusLike(userId: string, statusLike: StatusLike) {

        return await LikesCommentsModel.findOneAndUpdate(
            {'likesInfo.userId': userId},
            {$set: {'likesInfo.$.statusLike': statusLike}},
        );

        /*   Если вы ищете объект без указания commentId, то поиск будет основываться только на поле userId. Если поле userId уникально в коллекции или у вас ожидается только одна запись с соответствующим userId, то это будет достаточно для поиска нужной сущности*/

    },

    async addNewObjectForLikesInfo(newObjectForLikesInfo: {
        userId: string,
        statusLike: StatusLike
    }, commentId: string) {

        return await LikesCommentsModel.findOneAndUpdate(
            {commentId},
            {$push: {likesInfo: newObjectForLikesInfo}}
        )
        /*  метод findOneAndUpdate() для поиска документа с указанным commentId и обновления его поля likesInfo. Мы используем оператор $push для добавления объекта newObjectForLikesInfo в массив likesInfo.*/

    }
}

