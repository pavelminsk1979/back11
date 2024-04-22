import {NextFunction, Response} from "express";
import {STATUS_CODE} from "../../common/constant-status-code";
import {tokenJwtServise} from "../../servisces/token-jwt-service";


export const idUserFromAccessTokenMiddleware = async (req: any, res: Response, next: NextFunction) => {

    const accessToken = req.headers.authorization

    const titleAndAccessToken = accessToken!.split(' ')
    //'Bearer lkdjflksdfjlj889765akljfklaj'

    const userId = await tokenJwtServise.getUserIdByToken(titleAndAccessToken[1])


    if(!userId){
        return res.sendStatus(STATUS_CODE.NOT_FOUND_404)
    } else {
        req.userId = userId
        return next()
    }
}



