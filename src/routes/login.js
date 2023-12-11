import express from "express";
import {login, signup} from "../controller/auth.js";

var router = express.Router();

/* GET home page. */
router.get('/login', function (req, res, next) {
    res.render('showLogin', {title: 'Login'});
});
router.post('/login',login);

export default router;
