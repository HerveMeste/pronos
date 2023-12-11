import express from "express";
import {signup} from "../controller/auth.js";

var router = express.Router();

/* GET home page. */
router.get('/signup', function(req, res, next) {
    res.render('showSignup', { title: 'Sign Up' });
});

router.post('/signup',signup )

export default router;
