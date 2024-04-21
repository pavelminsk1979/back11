import {agent as supertest} from "supertest";
import {app} from "../src/settings";
import {STATUS_CODE} from "../src/common/constant-status-code";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

/*этот тест запустить и потом  убрать skip у тех которые имеют
его*/
dotenv.config()

const  req = supertest(app)

describe('/comments',()=>{

    let idNewBlog:string

    const loginPasswordBasic64='YWRtaW46cXdlcnR5'


    beforeAll(async ()=>{

        const mongoUri = process.env.MONGO_URL ;

        if(!mongoUri){
            throw new Error('URL not find(file likeComments.e2e.test.ts')
        }

        await mongoose.connect(mongoUri
            ,{ dbName:process.env.DB_NAME });

        await req
            .delete ('/testing/all-data')

        const createRes =await req
            .post('/blogs')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ name: 'nameBlog',
                description: 'descriptionBlog',
                websiteUrl:'https://www.outue.Blog/'})
            .expect(STATUS_CODE.CREATED_201)
        idNewBlog=createRes.body.id
        //console.log(idNewBlog)
    })


    afterAll(async () => {
        await mongoose.disconnect()
    });




    const loginNewUser ='300300'
    const passwordNewUser ='11111pasw'
    const emailNewUser ='palPel@mail.ru'

    it(' create newUsers',async ()=>{
        const res =await req
            .post('/users')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ login: loginNewUser,
                password: passwordNewUser,
                email:emailNewUser})
            .expect(STATUS_CODE.CREATED_201)



        expect(res.body.login).toEqual(loginNewUser)
        expect(res.body.email).toEqual(emailNewUser)
    })


let jwtToken=''
    it("input correct login and password and sign in (ok)",async ()=>{
        const res =await req
            .post('/auth/login')
            .send({ loginOrEmail: loginNewUser,
                password: passwordNewUser})
            .expect(STATUS_CODE.SUCCESS_200)


        jwtToken=res.body.accessToken
         console.log('accessToken'+' '+jwtToken)

        expect(res.body.accessToken).toBeTruthy()
    })



    let idNewPost:string

    it(' create newPost',async ()=>{
        const res =await req
            .post('/posts')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ title: 'title',
                shortDescription: 'shortDescription',
                content:'content',
                blogId:idNewBlog})
            .expect(STATUS_CODE.CREATED_201)

        idNewPost=res.body.id

        expect(res.body.title).toEqual('title')
        expect(res.body.shortDescription).toEqual('shortDescription')
        expect(res.body.content).toEqual('content')
    })

let idComment:string
    it(" create newComment for exist  post",async ()=>{
        const res =await req
            .post(`/posts/${idNewPost}/comments`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({content:'content for comments for post'})
            .expect(STATUS_CODE.CREATED_201)

        idComment=res.body.id
        console.log('idComment'+' '+idComment)

    })



//////////////////////////////////////////////////////////////////
    //:commentId/like-status


    it(" create entity For Collection LikesComments",async ()=>{
        const res =await req
            .put(`/comments/${idComment}/like-status`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({likeStatus:"Dislike"})
            .expect(STATUS_CODE.NO_CONTENT_204)


    })

        //следующие 2 теста будут только менять статус

/*    it(" create entity For Collection LikesComments",async ()=>{
        const res =await req
            .put(`/comments/${idComment}/like-status`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({likeStatus:"None"})
            .expect(STATUS_CODE.NO_CONTENT_204)


    })*/


/*    it(" create entity For Collection LikesComments",async ()=>{
        const res =await req
            .put(`/comments/${idComment}/like-status`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({likeStatus:"Like"})
            .expect(STATUS_CODE.NO_CONTENT_204)


    })*/



    it('Get post bu incorrect id',async ()=>{
        const res =await req
            .get('/comments/'+idComment)
            .expect(STATUS_CODE.SUCCESS_200)
        console.log(res.body)

    })


})