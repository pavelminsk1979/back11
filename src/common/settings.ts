export const settings = {

    JWT_SECRET_AccessTOKEN: process.env.JWT_AccessTOKEN_SECRET || 'accessToken_secret' ,

    TIME_LIFE_AccessTOKEN: '600000s',

    JWT_SECRET_RefreshTOKEN: process.env.JWT_RefreshTOKEN_SECRET || 'refreshToken' ,

    TIME_LIFE_RefreshTOKEN: '1200000s',
}