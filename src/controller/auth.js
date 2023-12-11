import { addUser, getUser, hasAdmin } from '../services/users.js'
import { compare,hash } from 'bcrypt'
import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'
import PocketBase from 'pocketbase';

import eventsource from 'eventsource';

global.EventSource = eventsource;

const pb = new PocketBase('http://127.0.0.1:8090');

const signup = async (req, res,next) => {

    console.log("signup!");
    try {
        const data = req.body
        if (data.password !== data.passwordConfirm) {
            next(createError(StatusCodes.BAD_REQUEST, "passwords do not match."))
            return
        }

        let user= {
            username: data.username,
            email: data.email,
            password: await hash(data.password, parseInt('9')),
            roles: ["user"]
        }

        //if (!await hasAdmin()) {
          //  user.roles.push("admin")
        //}
        console.log(user);
        const records = await pb.collection('user').create(user);
        console.log(records)
        req.session.user = user
        console.log(req.session.user)
        res.redirect('/login')
    }
    catch (err) {
        throw err
    }
}

const login = async (req, res,next) => {

    console.log("login!");

    const data  = req.body
    try {
        const user = await pb.collection('user').getOne('RECORD_ID', {
            expand: 'relField1,relField2.subRelField',
        });
        /*const user = await getUser(data.email)*/
        if (!user) {
            // next(createError(StatusCodes.BAD_REQUEST, "invalid user/password."))
            res.render("showLogin",{showError:true})
            return
        }
        console.log("hash",user.pwdHash);
        console.log("pass",data.password);

        const pwdOk = await compare(data.password, user.pwdHash)
        console.log("pwdok",pwdOk);

        if (!pwdOk) {
            // next(createError(StatusCodes.BAD_REQUEST, "invalid user/password."))
            res.render("showLogin", { showError: true })
            return
        }
        console.log("login OK");

        req.session.user = user
        res.redirect('/')
    }
    catch (err) {
        console.log(err.message);
        throw err
    }
}

export { signup,login }