//Routes
const express = require('express');
const router = express.Router();

//Auth
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

//GET & POST Routes with Auth
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('links/signUp', {
        mainJS: '<script async src="/scripts/main.js"></script>',
        rendererJS: '<script defer src="/scripts/renderer.js"></script>',
        styles: 'logreg',
        documentTitle: 'HannaH - Registro'
    });
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    successFlash: true,
    failureFlash: true,
    session: false
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('links/signIn', {
        mainJS: '<script async src="/scripts/main.js"></script>',
        rendererJS: '<script defer src="/scripts/renderer.js"></script>',
        styles: 'logreg',
        documentTitle: 'HannaH - Iniciar Sesión'
    });
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureFlash: true,
        successFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {
        mainJS: '<script async src="/scripts/main.js"></script>',
        rendererJS: '<script defer src="/scripts/renderer.js"></script>',
        styles: 'styles',
        documentTitle: 'HannaH - Perfil',
        theme: req.user.theme
    });
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;