import {NextFunction, Response} from "express";
import {ObjectId} from "mongodb";
import {STATUS_CODE} from "../../common/constant-status-code";



export const idMiddleware = async (req: any, res: Response, next: NextFunction) => {
    debugger
    const id = req.params.id.trim()
    debugger
    const result = await ObjectId.isValid(id)

    if (result) {
        return next()
    } else {
        return res.sendStatus(STATUS_CODE.NOT_FOUND_404)
    }
}