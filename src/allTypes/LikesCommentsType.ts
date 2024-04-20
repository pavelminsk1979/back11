
export enum StatusLike {
    None = 'None',
    Like = 'Like',
    Dislike  = 'Dislike'
}

export type LikesComments = {
   commentId:string //  из url адреса
    likesInfo:LikesInfo[]
}

type LikesInfo={
    userId: string // из AccessToken
    statusLike:StatusLike  // из url адреса
}