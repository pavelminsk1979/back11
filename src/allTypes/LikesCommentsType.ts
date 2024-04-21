
export enum StatusLike {
    None = 'None',
    Like = 'Like',
    Dislike  = 'Dislike'
}

type LikesInfo={
    userId: string // из AccessToken
    statusLike:StatusLike  // из url адреса
}

export type LikesComments = {
   commentId:string //  из url адреса
    likesInfo:LikesInfo[]
}

